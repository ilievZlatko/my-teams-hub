import Link from 'next/link'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/navigation'
import { SignOutButton } from '../signout-button'
import OrganizationSwitcher from '../organization-switcher'
import { SelectLocale } from '../select-locale'
import Image from 'next/image'
import { UserMenu } from '../user-menu'

export default async function Header({ locale }: { locale: Locale }) {
  const { navigation } = await getDictionary(locale);

  return (
    <header style={{ background: 'linear-gradient(90deg, #8C9BA7 31%, #4C6070 100%)' }} className='py-4 bg:linear-gradient([90deg], [#8C9BA7] [31%], [#4C6070] [100%]) w-full h-[64px]'>
      <nav className='container flex items-center justify-between'>
        <ul className='flex gap-x-8'>
          <li>
            <Link href={`/${locale}`}>{navigation.home}</Link>
          </li>
          <li>
            <Link href={`/${locale}/dashboard`}>{navigation.dashboard}</Link>
          </li>
        </ul>

        <div className='flex items-center gap-x-4'>
          <OrganizationSwitcher />
          <SelectLocale />
          <UserMenu />
        </div>
      </nav>
    </header>
  )
}
