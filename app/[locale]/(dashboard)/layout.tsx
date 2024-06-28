import React, { useEffect, useState } from 'react'
import Header from '@/components/header'
import { Locale, locales } from '@/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { SideBar } from '@/components/side-bar/index'

export async function generateStaticParams() {
  return locales.map(locale => ({ locale: locale }))
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
      <div className='h-full'>
        <Header locale={params.locale} />
        <div className='w-full h-full flex'>
          <SideBar/>
          <main className='flex flex-col p-8'>{children}</main>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
