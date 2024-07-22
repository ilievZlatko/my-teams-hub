'use client'

import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { logout } from '@/actions/logout'
import { useLocale } from 'next-intl'
import Link from 'next/link'

export type UserMenuProps = {
  name?: string
  email?: string | null
}

export const UserMenu = ({ name, email }: UserMenuProps) => {
  const locale = useLocale()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src={'/assets/images/profile.svg'}
          alt="hamburger"
          className="relative cursor-pointer lg:top-1"
          width={50}
          height={50}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Profile</DropdownMenuLabel>
        <DropdownMenuItem>
          <div className="flex gap-2">
            <p className="font-semibold">Name:</p>
            <p>{name}</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex gap-2">
            <p className="font-semibold">Email:</p>
            <p>{email}</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={'/users/edit'}>Edit ptofile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => logout(locale)}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
