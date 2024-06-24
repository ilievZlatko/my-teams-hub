import NextAuth, { DefaultSession, User } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'
import { Organization } from '@/types/organization.types'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    token: JWT['token']
    refresh_token: JWT['token']
    access_token: string
    user: User
    organizations: Organization[]
    activeOrg: Organization | null
  }

  interface User {
    id: string
    token: string
    refresh_token: string
    firstName: string
    lastName: string
    phoneNumber: string
    photo?: string
    accessToken?: string
    refreshToken?: string
    userId?: string
    error?: { error: Array<{ code: string }> } | string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string
    token: string
    refresh_token: string | null | undefined
    access_token: string
  }
}
