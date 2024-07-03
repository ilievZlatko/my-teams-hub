'use client'

import Link from 'next/link'
import { locales } from '@/navigation'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type LocaleSwitcherProps = React.HTMLAttributes<HTMLElement>

export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const pathName = usePathname()

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <ul className="flex gap-x-3">
      {locales.map((locale) => {
        return (
          <li key={locale}>
            <Link
              href={redirectedPathName(locale)}
              className={cn(
                'rounded-md border bg-black px-3 py-2 text-white',
                className,
              )}
            >
              {locale}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
