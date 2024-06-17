'use server'

import { AuthError } from 'next-auth'
import { LoginFormData, LoginSchema } from '@/schemas/login.schema'
import { signIn } from '@/config/auth.config'
import { DEFAULT_LOGIN_REDIRECT } from '@/consts/protectedRoutes'
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
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
    return { success: "You've successfully logged in!" }
  } catch (error: any) {
    console.error(error)
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        default:
          return { error: 'An error has occurred!' }
      }
    }

    throw error
  }
}
