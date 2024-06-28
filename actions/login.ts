'use server'

import { AuthError } from 'next-auth'
import { LoginFormData, LoginSchema } from '@/schemas/login.schema'
import { signIn } from '@/config/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/consts/protectedRoutes'
import { PROVIDERS } from '@/consts/providers'
import { getLocale } from 'next-intl/server'

export const login = async (values: LoginFormData) => {
  const validatedFields = LoginSchema.safeParse(values)
  const locale = await getLocale()

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  try {
    const { email, password } = validatedFields.data

    await signIn(PROVIDERS.CREDENTIALS, {
      email,
      password,
      redirectTo: `/${locale}/${DEFAULT_LOGIN_REDIRECT}`,
    })
    return { success: "You've successfully logged in!" }
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid email or password!' }
        default:
          return { error: error?.message || 'An error has occurred!' }
      }
    }

    throw error
  }
}
