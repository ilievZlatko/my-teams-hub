'use server'

import { AuthError } from 'next-auth'
import { LoginFormData, LoginSchema } from '@/schemas/login.schema'
import { signIn } from '@/config/auth'
import { PROVIDERS } from '@/consts/providers'

export const login = async (values: LoginFormData) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  try {
    const { email, password } = validatedFields.data

    await signIn(PROVIDERS.CREDENTIALS, {
      email,
      password,
      redurect: false,
    })
    return { success: "You've successfully logged in!" }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
