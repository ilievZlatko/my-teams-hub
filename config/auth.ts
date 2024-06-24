import NextAuth, { AuthError, NextAuthConfig } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import authConfig from './auth.config'

export const config = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth
    },
    async signIn({ user }): Promise<string | boolean> {
      console.log('ERROR CODE: ', user)
      if (user?.error) {
        throw new Error((user?.error as any)?.[0]?.code)
      }
      return true
    },
    async jwt({ token, user }): Promise<JWT | null> {
      return { ...token, ...user }
    },
    async session({ session, user, token }) {
      session.user = user
      session.token = token
      return session
    },
  },
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
} satisfies NextAuthConfig

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth(config)
