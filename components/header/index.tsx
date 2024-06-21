import Link from 'next/link'
import { getDictionary } from '@/lib/dictionary'
import { LocaleSwitcher } from '@/components/locale-switcher'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { Locale } from '@/navigation'
import { SignOutButton } from '../signout-button'

export default async function Header({ locale }: { locale: Locale }) {
  const { navigation } = await getDictionary(locale)

  return (
    <header className='py-4 border-b border-b-slate-200 dark:border-b-slate-800'>
      <nav className='container flex items-center justify-between'>
        <ul className='flex gap-x-8'>
          <li>
            <Link href={`/${locale}`}>{navigation.home}</Link>
          </li>
          <li>
            <Link href={`/${locale}/dashboard`}>{navigation.dashboard}</Link>
          </li>
        </ul>

        <div className='flex items-center gap-x-8'>
          <LocaleSwitcher />
          <ThemeSwitcher />
          <SignOutButton />
        </div>
      </nav>
    </header>
  )
}
