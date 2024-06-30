import Image from 'next/image'

import { Locale, locales } from '@/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
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
    <div className='flex flex-col h-screen lg:px-6 bg-gradient-to-tr from-[#CFDDE1] from-0% via-[#FDFDFF] via-50% to-[#EFF4F5] to-80%'>
      <div className='flex h-auto m-4 justify-end'>
        <SelectLocale className='bg-transparent' />
      </div>
      <div className='flex flex-col lg:flex-row lg:gap-20 h-full'>
        <aside className='flex flex-col px-6 gap-6 justify-center lg:h-full lg:justify-between lg:gap-[154px]'>
          <Image
            src='/assets/images/title-logo.svg'
            className='w-full h-auto mx-auto object-contain max-w-[567px] lg:mt-[150px]'
            alt='MyTeamsHub logo'
            width={100}
            height={100}
            priority
          />
          <Image
            src='/assets/images/team.svg'
            className='hidden lg:flex lg:sticky bottom-0'
            alt='team'
            width={800}
            height={600}
            priority
          />
        </aside>
        <main className='flex justify-center lg:my-auto'>{children}</main>
      </div>
    </div>
  )
}
