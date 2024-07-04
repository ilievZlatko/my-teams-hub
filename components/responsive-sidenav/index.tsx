'use client'

import Image from 'next/image'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { routes } from '@/routes'
import SideNavItem from '../side-nav-route'
import { UserMenu, UserMenuProps } from '../user-menu'

export const ResponsiveSideNav = ({ name, email }: UserMenuProps) => {
  return (
    <div className="block h-full lg:hidden">
      <Sheet>
        <SheetTrigger>
          <Image
            src={'/assets/images/hamburger.svg'}
            alt="hamburger"
            className="cursor-pointer"
            width={24}
            height={24}
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-mth-grey-blue-600">
          <SheetTitle>
            <SheetClose>
              <Image
                src={'/assets/images/hamburger.svg'}
                alt="hamburger"
                className="cursor-pointer"
                width={24}
                height={24}
              />
            </SheetClose>
          </SheetTitle>
          <SheetDescription></SheetDescription>

          {routes.map((route, index) => (
            <div className="mb-4" key={index}>
              <SideNavItem
                image={route.image}
                routeName={route.routeName}
                subRoutes={route.subRoutes}
                url={route.url}
                isOpen={true}
              />
            </div>
          ))}
          <SheetFooter className="mt-auto flex w-full">
            <div className="flex w-full">
              <div className="h-7 w-7">
                <UserMenu name={name} email={email} />
              </div>
              <p className="ml-5 text-mth-silver-200">My Profile</p>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
