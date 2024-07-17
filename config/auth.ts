import NextAuth, { NextAuthConfig } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { PROVIDERS } from '@/consts/providers'
import authConfig from './auth.config'

export const config = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth && !!auth?.user?.accessToken
    },
    async jwt({ token, user, session, account, trigger }): Promise<JWT | null> {
      if (trigger === 'update') {
        token = {
          ...token,
          activeOrg: session?.user?.activeOrg,
          organizations: session?.user?.organizations || token?.organizations,
        }
        return token
      }

      if (user) {
        if (account?.type === PROVIDERS.CREDENTIALS) {
          const token = {
            ...user,
            id: String(user.id),
            user_id: user.userId,
            access_token: String(user.accessToken),
            issued_at: Date.now(),
            expires_at: Date.now() + Number(account.expires_in) * 1000,
            refresh_token: user.refreshToken,
            email: user.email,
            first_name: user.firstName,
            last_name: user.lastName,
          }
          return token
        }

        if (account?.type === 'oauth') {
          const token = {
            ...user,
            id: String(user.id),
            access_token: String(account.access_token),
            issued_at: Date.now(),
            expires_at: Date.now() + Number(account.expires_in) * 1000,
            refresh_token: String(account.refresh_token),
          }

          return token
        }
      }

      return token
    },
    async session({ session, user, token }) {
      session.user = { ...token, ...user }
      session.token = token
      session.refresh_token = token.refresh_token
      session.access_token = token.access_token
      session.refresh_token = token.refresh_token

      return session
    },
  },
  session: { strategy: 'jwt' },
  ...authConfig,
} satisfies NextAuthConfig

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth(config)
