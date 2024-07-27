import * as z from 'zod'

export const EditUserSchema = z.object({
  firstName: z.string().min(1, { message: 'schema_msg_first_name_require' }),
  lastName: z.string().min(1, { message: 'schema_msg_last_name_require' }),
  email: z.string().email().min(1, { message: 'schema_msg_email_require' }),
  phone: z.string().min(1, { message: 'schema_msg_phone_require' }),
})

export type EditUserFormData = z.infer<typeof EditUserSchema>
