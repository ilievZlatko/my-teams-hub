import type { Metadata } from 'next'
import { Open_Sans, Poppins, Roboto_Slab } from 'next/font/google'
import Header from '@/components/header'
import Providers from '@/providers'
import { auth } from '@/config/auth.config'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Locale, locales } from '@/navigation'
import './globals.css'

const openSans = Open_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-opensans',
})

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

const roboto = Roboto_Slab({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'My Teams Hub',
  description: 'My Teams Hub, manage all your teams.',
}

export async function generateStaticParams() {
  return locales.map(locale => ({ locale: locale }))
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { locale: Locale }
}>) {
  const session = await auth()
  const messages = await getMessages()

  return (
    <html
      lang={params.locale}
      suppressHydrationWarning
    >
      <body
        className={`${openSans.variable} ${roboto.variable} ${poppins.variable} font-sans`}
      >
        <Providers>
          <NextIntlClientProvider messages={messages}>
            {session && session.user ? (
              <>
                <Header locale={params.locale} />
                <main className='flex p-6'>{children}</main>
              </>
            ) : (
              <main className='flex'>{children}</main>
            )}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
