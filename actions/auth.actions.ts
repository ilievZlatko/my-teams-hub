'use server'

import { AuthError } from 'next-auth'
import { LoginFormData, LoginSchema } from '@/schemas/login.schema'
import { signIn, signOut } from '@/config/auth'

import routes from '@/api-routes'
import { RegisterFormData, RegisterSchema } from '@/schemas/register.schema'
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
export const logout = async (locale: string) => {
  await signOut({ redirectTo: `/${locale}/login`, redirect: true })
  location.reload()
}
export const register = async (values: RegisterFormData) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, phoneNumber, password, firstName, lastName } =
    validatedFields.data

  try {
    const response = await fetch(
      process.env.API_BASE_URL! + routes.register.post,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
        }),
        cache: 'no-cache',
      },
    )

    if (!response.ok) {
      throw new Error(
        `Response status: ${response.status} ${response.statusText}`,
      )
    }

    // if (!response.ok) throw new Error('Register failed')

    const user = await response.json()

    if (!user) throw new Error('User not found')

    return { success: "You've successfully registered!", user: user.data }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error register in: ', error)
    if (error?.message) {
      return { error: error.message }
    }
    return { error: 'An error has occurred!' }
  }
}
