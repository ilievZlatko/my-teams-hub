'use server'

import { RegisterFormData, RegisterSchema } from '@/schemas/register.schema'
import routes from '@/api-routes'

export const register = async (values: RegisterFormData) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, phone, password, name } = validatedFields.data

  try {
    const response = await fetch(
      process.env.API_BASE_URL! + routes.register.post,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: name.split(' ')[0],
          lastName: name.split(' ')[1],
          email,
          phone,
          password,
        }),
        cache: 'no-cache',
      },
    )
    if (!response.ok) throw new Error('Register failed')

    const user = await response.json()

    if (!user) throw new Error('User not found')

    return user
  } catch (error) {
    console.error('Error register in: ', error)
  }

  return { success: 'Confirmation email sent!' }
}
