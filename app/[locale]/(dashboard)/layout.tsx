import React from 'react'
import Header from '@/components/header'
import { Locale, locales } from '@/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { SideNav } from '@/components/side-nav/index'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const DashboardLayout = ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) => {
  unstable_setRequestLocale(params.locale)

  return (
    <>
      <div className="flex h-screen w-full flex-col relative">
        <div className='sticky top-0 left-0 z-50'>
          <Header />
        </div>
        <div className="flex  w-full justify-stretch">
          <SideNav />
          <main className="mx-auto min-h-screen overflow-y-auto flex w-full flex-col items-center p-8 pb-20 max-sm:p-4">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
