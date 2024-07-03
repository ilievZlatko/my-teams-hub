'use client';

import { US, BG } from 'country-flag-icons/react/3x2';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Locale, locales } from '@/navigation';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type LocaleSwitcherProps = React.HTMLAttributes<HTMLElement> & {
  isLoginPage?: boolean;
}

export const SelectLocale = ({ className, isLoginPage }: LocaleSwitcherProps) => {
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
    <div className='flex flex-col gap-y-2 p-0'>
      <Select
        value={locale}
        onValueChange={handleStringToInt}
      >
        <SelectTrigger className={`w-12 bg-transparent border-transparent p-0 text-base font-poppins leading-2 font-normal ${isLoginPage ? 'text-black' : 'text-mth-silver-200'}`}>
          <SelectValue>{language}</SelectValue>
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
              <span className='text-base font-poppins leading-2 font-normal'>EN</span>
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
              <span className='text-base font-poppins leading-2 font-normal'>BG</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
