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
      <div className="flex h-full w-full flex-col">
        <div>
          <Header />
        </div>
        <div className="flex h-full min-h-screen w-full justify-stretch">
          <SideNav />
          <main className="mx-auto flex flex-col p-8 w-full max-sm:p-4">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
