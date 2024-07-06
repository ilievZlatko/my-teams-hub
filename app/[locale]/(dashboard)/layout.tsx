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
      <div className="flex flex-col w-full h-full">
        <div>
          <Header />
        </div>
        <div className="flex justify-stretch w-full h-full min-h-screen">
          <SideNav />
          <main className="flex flex-col mx-auto p-8 max-sm:p-4">{children}</main>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
