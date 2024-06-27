'use client'

import { US, BG } from 'country-flag-icons/react/3x2'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Locale, locales } from '@/navigation'
import { cn } from '@/lib/utils'

import { useRouter } from 'next/navigation'

type LocaleSwitcherProps = React.HTMLAttributes<HTMLElement>

export const SelectLocale = ({ className }: LocaleSwitcherProps) => {
  const pathName = usePathname()
  const router = useRouter()

  const locale = useLocale() as Locale

  const [language, setLanguage] = useState(locale)

  useEffect(() => {
    router.push(redirectedPathName(language))
  }, [language])

  const handleStringToInt = (event: any) => {
    setLanguage(event)
  }

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <div className='flex flex-col gap-y-2'>
      <Select
        value={locale}
        onValueChange={handleStringToInt}
      >
        <SelectTrigger className='bg-transparent text-primar'>
          <SelectValue placeholder='Select language' />
        </SelectTrigger>
        <SelectContent className='background-background text-primary'>
          <SelectItem
            key={locales[0]}
            value={locales[0]}
            className='background-background text-primary'
          >
            <div className={cn('flex items-center gap-1', className)}>
              <US
                title='Great Britain'
                className='w-6 h-auto'
              />
              <span>EN</span>
            </div>
          </SelectItem>
          <SelectItem
            key={locales[1]}
            value={locales[1]}
            className='background-background text-primary'
          >
            <div className={cn('flex items-center gap-1', className)}>
              <BG
                title='Bulgarian'
                className='w-6 h-auto'
              />
              <span>BG</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
