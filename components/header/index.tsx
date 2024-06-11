import Link from 'next/link'
import { Locale } from '@/config/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { LocaleSwitcher } from '@/components/locale-switcher'
import { ThemeSwitcher } from '@/components/theme-switcher'

export default async function Header({ lang }: { lang: Locale }) {
  const { navigation } = await getDictionary(lang)

  return (
    <header className='py-4 border-b border-b-slate-200 dark:border-b-slate-800'>
      <nav className='container flex items-center justify-between'>
        <ul className='flex gap-x-8'>
          <li>
            <Link href={`/${lang}`}>{navigation.home}</Link>
          </li>
          <li>
            <Link href={`/${lang}/dashboard`}>{navigation.dashboard}</Link>
          </li>
        </ul>

        <div className='flex items-center gap-x-8'>
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  )
}
