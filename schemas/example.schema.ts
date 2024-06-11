import * as z from 'zod'

export const ExampleSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z
    .string()
    .min(6, {
      message: 'Password must be at least 6 characters long',
    })
    .max(72, {
      message: 'Password must be at most 72 characters long',
    }),
})
