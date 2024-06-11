import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { Locale, i18n } from '@/config/i18n.config'
import { CustomMiddleware } from './chain'
import { auth } from '@/config/auth.config'
import { protectedRoutes } from '@/consts/protectedRoutes'

function getProtectedRoutes(protectedPaths: string[], locales: Locale[]) {
  let protectedPathsWithLocale = [...protectedPaths]

  protectedPaths.forEach(route => {
    locales.forEach(
      locale =>
        (protectedPathsWithLocale = [
          ...protectedPathsWithLocale,
          `/${locale}${route}`,
        ]),
    )
  })

  return protectedPathsWithLocale
}

export function withAuthMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // Create a response object to pass down the chain
    const response = NextResponse.next()
    const session = await auth()
    const pathname = request.nextUrl.pathname
    const protectedPathsWithLocale = getProtectedRoutes(protectedRoutes, [
      ...i18n.locales,
    ])

    if (!session?.token && protectedPathsWithLocale.includes(pathname)) {
      const signInUrl = new URL('/api/auth/signin', request.url)
      signInUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(signInUrl)
    }

    // @ts-ignore
    request.nextauth = request.nextauth || {}
    // @ts-ignore
    request.nextauth.token = session?.token

    return middleware(request, event, response)
  }
}
