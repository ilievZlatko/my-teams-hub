import React from 'react'
import Header from '@/components/header'
import { Locale, locales } from '@/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { SideBar } from '@/components/side-bar/index'

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
      <div className="h-full">
        <Header />
        <div className="flex h-full w-full">
          <SideBar />
          <main className="flex w-full flex-col p-8">{children}</main>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
