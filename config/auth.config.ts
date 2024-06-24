import routes from '@/api-routes'
import { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { LoginSchema } from '@/schemas/login.schema'

export default {
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'john.doe@mail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials?.email || !credentials?.password)
          return { error: [{ code: 'missing_credentials' }] }
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          try {
            const loginResponse = await fetch(
              process.env.API_BASE_URL! + routes.login.post,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: credentials.email,
                  password: credentials.password,
                }),
                cache: 'no-cache',
              },
            )
            const userInfo = await loginResponse.json()

            if (!loginResponse.ok) {
              throw new Error(userInfo?.errors?.[0]?.code)
            }

            const userResponse = await fetch(
              process.env.API_BASE_URL! + routes.me.get,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${userInfo?.data?.accessToken}`,
                },
                cache: 'no-cache',
              },
            )
            const user = await userResponse.json()

            if (!userResponse.ok) {
              throw new Error(user?.errors?.[0]?.code)
            }

            return {
              ...userInfo.data,
              ...user.data,
            }
          } catch (error: any) {
            return { error: [{ code: 'generic_error' }] }
          }
        } else {
          return { error: [{ code: 'generic_error' }] }
        }
      },
    }),
  ],
} satisfies NextAuthConfig
