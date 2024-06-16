import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { i18n, Locale } from '@/config/i18n.config';
import Header from '@/components/header';
import Providers from '@/providers';
import './globals.css';
import { auth } from "@/config/auth.config";

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'My Teams Hub',
  description: 'My Teams Hub, manage all your teams.',
};

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale; };
}>) {
  const session = await auth();

  return (
    <html
      lang={params.lang}
      suppressHydrationWarning
    >
      <body className={inter.className}>
        <Providers>
          {session && session.user
            ? (
              <>
                <Header lang={params.lang} />
                <main className='flex p-6'>{children}</main>
              </>
            ) : (
              <main className='flex'>{children}</main>
            )}
        </Providers>
      </body>
    </html>
  );
}
