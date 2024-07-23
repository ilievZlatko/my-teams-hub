'use client'

import OrganizationSwitcher from '../organization-switcher'
import { SelectLocale } from '../select-locale'
import { UserMenu } from '../user-menu'
import { ResponsiveSideNav } from '../responsive-sidenav'
import { IoIosGlobe } from 'react-icons/io'

interface HeaderProps {
  name: string
  email: string
}

export default function Header({ name, email }: HeaderProps) {
  return (
    <header className="w-full bg-mth-grey-blue-600">
      <nav className="container flex items-center justify-between px-4 py-3 lg:px-8">
        <ResponsiveSideNav
          name={name}
          email={email}
        />
        <div className="flex w-72 items-center justify-between gap-x-4 lg:ml-auto lg:w-80">
          <OrganizationSwitcher />
          <div className="items-centers flex justify-center px-2">
            <IoIosGlobe className="pl-auto my-auto hidden h-6 w-8 text-mth-silver-200 md:block" />
            <SelectLocale />
          </div>
          <div className="hidden lg:block">
            <UserMenu 
              name={name}
              email={email} />
          </div>
        </div>
      </nav>
    </header>
  )
}
