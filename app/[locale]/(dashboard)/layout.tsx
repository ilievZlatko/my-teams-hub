import React from 'react'
import Header from '@/components/header'
import { Locale } from '@/navigation'

const DashboardLayout = ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) => {
  return (
    <>
      <Header locale={params.locale} />
      <main className='flex flex-col p-8'>{children}</main>
    </>
  )
}

export default DashboardLayout
