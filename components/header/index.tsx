import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/navigation'
import OrganizationSwitcher from '../organization-switcher'
import { SelectLocale } from '../select-locale'
import { UserMenu } from '../user-menu'
import { ResponsiveSideBar } from '../responsive-sidebar'

export default async function Header({ locale }: { locale: Locale }) {
  const { navigation } = await getDictionary(locale);

  return (
    <header className='bg-mth-grey-blue-600 w-full'>
      <nav className='container flex items-center justify-between py-3 px-4 lg:px-8'>
        <ResponsiveSideBar/>
        <div className='flex items-center gap-x-4 lg:ml-auto'>
          <OrganizationSwitcher />
          <SelectLocale />
          <div className='hidden md:block'>
            <UserMenu />
          </div>
        </div>
      </nav>
    </header>
  )
}

