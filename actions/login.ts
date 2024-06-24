'use server'

import { AuthError } from 'next-auth'
import { LoginFormData, LoginSchema } from '@/schemas/login.schema'
import { signIn } from '@/config/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/consts/protectedRoutes'
import { PROVIDERS } from '@/consts/providers'
import { redirect } from 'next/navigation'

export const login = async (values: LoginFormData) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  try {
    const { email, password } = validatedFields.data

    const response = await signIn(PROVIDERS.CREDENTIALS, {
      email,
      password,
      redirect: false,
    })

    if (response?.error) {
      return { error: JSON.parse(response.error) }
    } else {
      redirect(DEFAULT_LOGIN_REDIRECT)
    }
  } catch (error: any) {
    console.log('CATCH ERROR: ', JSON.parse(error))
    return { error: error }
  }
}
