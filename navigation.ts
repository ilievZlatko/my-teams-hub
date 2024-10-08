import { createSharedPathnamesNavigation } from 'next-intl/navigation'

export const locales = ['en', 'bg'] as const
export const defaultLocale = locales[0]
export type Locale = (typeof locales)[number]
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales })
