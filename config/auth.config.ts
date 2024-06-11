import NextAuth, { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'

const config = {
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const response = await fetch(
          process.env.API_BASE_URL! + '/auth/login',
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
    async jwt({ token, user, account, profile }) {
      if (user && user.id) {
        token.id = user.id
        token.token = user.token
        token.refresh_token = user.refresh_token
      }
      return token
    },
    async session({ session, user, token }) {
      session.user = user
      session.token = token
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
