import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/navigation'
import OrganizationSwitcher from '../organization-switcher'
import { SelectLocale } from '../select-locale'
import { UserMenu } from '../user-menu'
import { ResponsiveSideBar } from '../responsive-sidebar'
import { IoIosGlobe } from 'react-icons/io'
import { auth } from '@/config/auth'

export default async function Header({ locale }: { locale: Locale }) {
  const { navigation } = await getDictionary(locale);
  const session = await auth();
  const name = session?.user.firstName;
  const email = session?.user.email

  return (
    <header className='bg-mth-grey-blue-600 w-full'>
      <nav className='container flex items-center justify-between py-3 px-4 lg:px-8'>
        <ResponsiveSideBar />
        <div className='flex items-center gap-x-4 w-96 lg:ml-auto'>
          <OrganizationSwitcher />
          <div className='flex items-centers justify-center px-2'>
            <IoIosGlobe className='hidden md:block w-8 h-6 text-mth-silver-200 my-auto pl-auto' />
            <SelectLocale />
          </div>
          <div className='hidden lg:block'>
            <UserMenu name={name} email={email}/>
          </div>
        </div>
      </nav>
    </header>
  )
}
