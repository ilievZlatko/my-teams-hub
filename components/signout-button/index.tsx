'use client'

import { LogOutIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { logout } from '@/actions/logout'
import { useLocale } from 'next-intl'

export const SignOutButton = () => {
  const locale = useLocale()
  return (
    <Button onClick={() => logout(locale)}>
      <LogOutIcon className='h-5 w-5' />
      Sign out
    </Button>
  )
}
