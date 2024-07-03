'use client'

import { useLocale } from 'next-intl'
import { LogOutIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { logout } from '@/actions/logout'

export const SignOutButton = () => {
  const locale = useLocale()
  const t = useTranslations('auth')

  return (
    <Button onClick={() => logout(locale)}>
      <LogOutIcon className="mr-2 h-5 w-5" />
      {t('signout')}
    </Button>
  )
}
