import { DefaultSession } from 'next-auth'
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
    accessToken?: string
    refreshToken?: string
    userId?: string
    organizations: Organization[]
    activeOrg: string | null
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
