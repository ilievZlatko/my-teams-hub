import * as z from 'zod'

export const EditUserSchema = z.object({
  firstName: z.string().min(1, { message: 'schema_msg_fname_require' }),
  lastName: z.string().min(1, { message: 'schema_msg_lname_require' }),
  email: z.string().email().min(1, { message: 'schema_msg_email_require' }),
  phoneNumber: z.string().min(1, { message: 'schema_msg_phone_require' }),
})

export type EditUserFormData = z.infer<typeof EditUserSchema>
