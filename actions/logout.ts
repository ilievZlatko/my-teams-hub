'use server'

import { signOut } from '@/config/auth'

export const logout = async (locale: string) => {
  await signOut({ redirectTo: `/${locale}/login`, redirect: true })
}
