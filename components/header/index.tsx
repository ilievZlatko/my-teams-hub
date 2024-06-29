import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/navigation'
import OrganizationSwitcher from '../organization-switcher'
import { SelectLocale } from '../select-locale'
import { UserMenu } from '../user-menu'

export default async function Header({ locale }: { locale: Locale }) {
  const { navigation } = await getDictionary(locale);

  return (
    <header className='py-4 bg-mth-grey-blue-600 w-full h-[64px]'>
      <nav className='container flex items-center justify-between'>
        {/* <ul className='flex gap-x-8'>
          <li>
            <Link href={`/${locale}`}>{navigation.home}</Link>
          </li>
          <li>
            <Link href={`/${locale}/dashboard`}>{navigation.dashboard}</Link>
          </li>
        </ul> */}

        <div className='flex items-center gap-x-4 ml-auto'>
          <OrganizationSwitcher />
          <SelectLocale />
          <UserMenu />
        </div>
      </nav>
    </header>
  )
}
