'use client'

import { LogOutIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { Button } from '../ui/button'

export const SignOutButton = () => {
  return (
    <Button onClick={() => signOut()}>
      <LogOutIcon className='h-5 w-5' />
      Sign out
    </Button>
  )
}
