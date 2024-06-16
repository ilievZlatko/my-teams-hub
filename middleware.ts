// import { chain } from '@/middlewares/chain'
// import { withAuthMiddleware } from '@/middlewares/auth.middleware'
// import { withI18nMiddleware } from '@/middlewares/i18n.middleware'

// export default chain([withAuthMiddleware, withI18nMiddleware])

// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//     '/',
//     '/(bg|en)/:path*',
//   ],
// }

import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'
import { config as authConfig } from './config/auth.config'
import NextAuth from 'next-auth'
import { locales } from './navigation'

const publicPages = ['/', '/login', '/register']

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en',
})

const { auth } = NextAuth(authConfig)

const authMiddleware = auth(async function middleware(req: NextRequest) {
  return intlMiddleware(req)
})

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages
      .flatMap(p => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
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
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
