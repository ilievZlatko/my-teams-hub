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
      <div className="flex flex-col h-screen w-full relative overflow-hidden">
        <div className="sticky top-0 left-0 z-50">
          <Header />
        </div>
        <div className="flex w-full h-full">
          <div className={`top-16 left-0 h-full z-40 transition-transform duration-300`}>
            <SideNav />
          </div>
          <main className={`flex-1 transition-all duration-300 overflow-y-auto`}>
            <div className="mx-auto flex w-full flex-col items-center p-8 pb-20 max-sm:p-4">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
