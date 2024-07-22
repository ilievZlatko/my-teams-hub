import React from 'react'
import { Locale, locales } from '@/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { SideNav } from '@/components/side-nav/index'
import HeaderWrapper from '@/components/header-wrapper'

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
      <div className="relative flex h-screen w-full flex-col overflow-hidden">
        <div className="sticky left-0 top-0 z-50">
          <HeaderWrapper />
        </div>
        <div className="flex h-full w-full">
          <div
            className={`left-0 top-16 z-40 h-full transition-transform duration-300`}
          >
            <SideNav />
          </div>
          <main
            className={`flex-1 overflow-y-auto transition-all duration-300`}
          >
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
