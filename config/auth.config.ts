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
      async authorize(credentials, _) {
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

            if (!loginResponse.ok) {
              throw new Error(userInfo.errors[0].code)
            }

            const userMeJson = await fetch(
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
            const parsedUser = await userMeJson.json()
            if (!userMeJson.ok) throw new Error(parsedUser?.errors[0]?.code)

            const url = `${process.env.API_BASE_URL}${routes.allOrgsUrl.get}`
            const orgsJson = await fetch(url, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo?.data?.accessToken}`,
              },
            })
            const orgs = await orgsJson.json()

            if (!orgsJson.ok) throw new Error(orgs?.errors[0]?.code)

            const user = {
              ...parsedUser.data,
              ...userInfo.data,
              organizations: orgs.data,
              activeOrg: null,
            }

            return user
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
