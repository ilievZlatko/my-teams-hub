import NextAuth, { DefaultSession, User } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    token: JWT['token']
    refresh_token: JWT['token']
    access_token: string
    user: User
  }

  interface User {
    id: string
    token: string
    refresh_token: string
    firstName: string
    lastName: string
    phoneNumber: string
    photo?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string
    token: string
    refresh_token: string
    access_token: string
  }
}
