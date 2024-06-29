import Image from 'next/image'

import { cn } from '@/lib/utils'
import { Locale, locales } from '@/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { LocaleSwitcher } from '@/components/locale-switcher'
import { SelectLocale } from '@/components/select-locale'

export async function generateStaticParams() {
  return locales.map(locale => ({ locale: locale }))
}

export default function AuthLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { locale: Locale }
}>) {
  unstable_setRequestLocale(params.locale)

  return (
    <div
      className={cn(
        'flex flex-col min-h-screen bg-[radial-gradient(circle_at_left_bottom,_var(--tw-gradient-stops))] from-[#CFDDE1] from-20% via-[#FDFDFF] via-50% to-[#EFF4F5] to-90%',
      )}
    >
      <div className='ml-auto mr-10 mt-6'>
        <SelectLocale className='bg-transparent' />
      </div>
      <div
        className={cn(
          'flex my-auto md:flex-row max-md:flex-col 3xl:h-screen justify-evenly md:items-end items-center',
        )}
      >
        <div className='flex flex-col items-start gap-14 pt-8 md:pt-10 max-md:w-[80%] max-md:pb-6 max-sm:pb-2 max-sm:max-w-[500px] max-sm:w-full lg:max-w-[600px]'>
          <Image
            src='/assets/images/title-logo.svg'
            className={cn(
              'mx-auto w-11/12 max-w-screen-md max-sm:pl-2 max-sm:mt-2',
            )}
            alt='MyTeamsHub logo'
            width={560}
            height={111}
            priority
          />
          <Image
            src='/assets/images/team.svg'
            className='max-md:hidden'
            alt='team'
            width={800}
            height={600}
            priority
          />
        </div>
        <main className='my-auto max-sm:min-w-[300px] max-sm:max-w-[360px] max-sm:w-full'>{children}</main>
      </div>
    </div>
  )
}
