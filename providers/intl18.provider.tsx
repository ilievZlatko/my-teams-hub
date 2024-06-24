import { Locale } from '@/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export const IntlClientProvider = async ({
  children,
  locale,
}: {
  children: React.ReactNode
  locale: Locale
}) => {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
    >
      {children}
    </NextIntlClientProvider>
  )
}
