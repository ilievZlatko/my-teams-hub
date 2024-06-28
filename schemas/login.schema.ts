import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'schema_msg_email_require',
  }),
  password: z
    .string()
    .min(1, {
      message: 'schema_msg_password_require',
    })
    .max(72, {
      message: 'schema_msg_password_invalid',
    }),
  rememberMe: z.boolean().default(false).optional(),
})

export type LoginFormData = z.infer<typeof LoginSchema>
