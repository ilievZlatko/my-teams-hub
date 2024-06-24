import Image from 'next/image'

import { cn } from '@/lib/utils'
import { Locale, locales } from '@/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'

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
        'flex w-screen h-screen lg:flex-row flex-col 3xl:h-screen justify-evenly lg:items-end items-center bg-[radial-gradient(circle_at_left_bottom,_var(--tw-gradient-stops))] from-[#CFDDE1] from-20% via-[#FDFDFF] via-50% to-[#EFF4F5] to-90%',
      )}
    >
      <div className='flex flex-col items-start gap-14 pt-8 md:pt-10 max-md:max-w-[500px] lg:max-w-[600px]'>
        <Image
          src='/assets/images/title-logo.svg'
          className={cn(
            'mx-auto w-11/12 max-sm:w-[310px] max-sm:pl-2 max-sm:mt-2',
          )}
          alt='MyTeamsHub logo'
          width={560}
          height={111}
          priority
        />
        <Image
          src='/assets/images/team.svg'
          className='max-lg:max-w-[500px] max-sm:w-[310px]'
          alt='team'
          width={800}
          height={600}
          priority
        />
      </div>
      <main className='my-auto'>{children}</main>
    </div>
  )
}
