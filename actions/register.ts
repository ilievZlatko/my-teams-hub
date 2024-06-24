'use server'

import { RegisterFormData, RegisterSchema } from '@/schemas/register.schema'
import routes from '@/api-routes'

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

    const user = await response.json()

    if (!response.ok) {
      return { error: user.errors }
    }

    return { success: "You've successfully registered!", user: user.data }
  } catch (err) {
    return { error: [{ code: 'generic_error' }] }
  }
}
