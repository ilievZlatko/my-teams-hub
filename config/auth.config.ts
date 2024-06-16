import NextAuth, { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'
import routes from '@/api-routes'

export const config = {
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const response = await fetch(
          process.env.API_BASE_URL! + routes.login.post,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
            cache: 'no-cache',
          },
        )
        if (!response.ok) return null
        return (await response.json()) ?? null
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth
    },
    async jwt({ token, user, account }): Promise<JWT | null> {
      if (user && account) {
        return {
          ...token,
          access_token: String(account.access_token),
          issued_at: Date.now(),
          expires_at: Date.now() + Number(account.expires_in) * 1000,
          refresh_token: String(account.refresh_token),
        }
      } else if (Date.now() < Number(token.expires_at)) {
        return token
      } else {
        console.log('Access token expired, getting new one')
        try {
          const response = await fetch('https://oauth2.googleapis.com/token', {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              client_id: process.env.AUTH_GOOGLE_ID!,
              client_secret: process.env.AUTH_GOOGLE_SECRET!,
              refresh_token: token.refresh_token!,
              grant_type: 'refresh_token',
              access_type: 'offline',
            }),
            method: 'POST',
          })

          const tokens = await response.json()

          if (!response.ok) {
            throw new tokens()
          }

          return {
            ...token,
            access_token: tokens.access_token,
            expires_at: Date.now() + Number(tokens.expires_in) * 1000,
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          }
        } catch (error) {
          console.error('Error refreshing access token: ', error)
          return { ...token, error: 'RefreshAccessTokenError' as const }
        }
      }
    },
    async session({ session, user, token }) {
      session.user = user
      session.token = token
      session.refresh_token = token.refresh_token
      session.access_token = token.access_token
      session.refresh_token = token.refresh_token

      return session
    },
  },
  session: { strategy: 'jwt' },
} satisfies NextAuthConfig

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth(config)
