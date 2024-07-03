import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from './config/auth'
import { defaultLocale, locales } from './navigation'
import { PROTECTED_ROUTES, PUBLIC_ROUTES } from './consts/protectedRoutes'

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en',
})

const authMiddleware = auth(async function middleware(req: NextRequest) {
  const session = await auth()
  const [, locale, ...segments] = req.nextUrl.pathname.split('/')

  const isProtectedRoute = PROTECTED_ROUTES.some((prefix) =>
    req.nextUrl.pathname.startsWith(prefix),
  )

  if (!session && isProtectedRoute) {
    let absoluteURL = null
    absoluteURL = locale
      ? new URL(`/${locale}/login`, req.nextUrl.origin)
      : new URL(`/${defaultLocale}/login`, req.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }

  return intlMiddleware(req)
})

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${PUBLIC_ROUTES.flatMap((p) =>
      p === '/' ? ['', '/'] : p,
    ).join('|')})/?$`,
    'i',
  )
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

  if (isPublicPage) {
    return intlMiddleware(req)
  } else {
    return (authMiddleware as any)(req)
  }
}

export const config = {
  matcher: ['/(bg|en)/:path*', '/((?!api|_next|.*\\..*).*)'],
}