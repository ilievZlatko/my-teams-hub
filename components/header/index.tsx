'use client'

import { useState, useEffect } from 'react'
import OrganizationSwitcher from '../organization-switcher'
import { SelectLocale } from '../select-locale'
import { UserMenu } from '../user-menu'
import { ResponsiveSideNav } from '../responsive-sidenav'
import { IoIosGlobe } from 'react-icons/io'
import { IUser } from '@/types/user'
import { EventType, listenFor } from '@/actions/component-comunication.actions'

interface HeaderProps {
  user: IUser
}

export default function Header({ user }: HeaderProps) {
  const [currentUser, setCurrentUser] = useState<IUser>(user)

  useEffect(() => {
    listenFor([EventType.UPDATE_USER], (payload: any) => {
      setCurrentUser(payload.payload.data)
    })
  }, [])

  useEffect(() => {
    setCurrentUser(user)
  }, [user])

  return (
    <header className="w-full bg-mth-grey-blue-600">
      <nav className="container flex items-center justify-between px-4 py-3 lg:px-8">
        <ResponsiveSideNav
          name={currentUser.firstName}
          email={currentUser.email}
        />
        <div className="flex w-72 items-center justify-between gap-x-4 lg:ml-auto lg:w-80">
          <OrganizationSwitcher />
          <div className="items-centers flex justify-center px-2">
            <IoIosGlobe className="pl-auto my-auto hidden h-6 w-8 text-mth-silver-200 md:block" />
            <SelectLocale />
          </div>
          <div className="hidden lg:block">
            <UserMenu name={currentUser.firstName} email={currentUser.email} />
          </div>
        </div>
      </nav>
    </header>
  )
}
