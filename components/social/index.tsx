'use client'

import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/components/ui/button'
import { PROVIDERS } from '@/consts/providers'
import { DEFAULT_LOGIN_REDIRECT } from '@/consts/protectedRoutes'
import { signIn } from 'next-auth/react'

export const Social = ({ label }: { label?: string }) => {
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        variant="primary-outline"
        className="w-full gap-2 rounded-lg border-[#3C4B57]"
        onClick={() =>
          signIn(PROVIDERS.GOOGLE, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
          })
        }
      >
        <FcGoogle className="h-5 w-5" />
        {label && <span className="text-[#3C4B57]">{label}</span>}
      </Button>
    </div>
  )
}
