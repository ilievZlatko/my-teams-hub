'use server'

import { signOut } from '@/config/auth.config'

export const logout = async (locale:string) => {
  await signOut({redirectTo:`/${locale}/login`, redirect:true});
};
