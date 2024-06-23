import routes from '@/api-routes'
import { LoginSchema } from '@/schemas/login.schema'
import { NextConfig } from 'next'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'

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
          return null
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

            if (!userInfo) throw new Error('User not found')

            const response = await fetch(
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
            const user = await response.json()

            if (!user) throw new Error('User not found')

            return {
              ...userInfo.data,
              ...user.data,
            }
          } catch (error: any) {
            throw new Error('LoginError: ', error?.message)
          }
        } else {
          throw new Error('Fields validation failed!')
        }
      },
    }),
  ],
} satisfies NextConfig
