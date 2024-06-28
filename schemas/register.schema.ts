import * as z from 'zod'

export const RegisterSchema = z.object({
  firstName: z.string().min(1, { message: 'schema_msg_fname_require' }),
  lastName: z.string().min(1, { message: 'schema_msg_lname_require' }),
  email: z.string().email().min(1, { message: 'schema_msg_email_require' }),
  phoneNumber: z.string().min(1, { message: 'schema_msg_phone_require' }),
  password: z.string().min(6, { message: 'schema_msg_password_require_6' }),
  rePassword: z.string(),
  check: z.literal<boolean>(true, {
    errorMap: () => ({ message: 'schema_msg_agree_terms' }),
  }),
}).refine(
  (values) => {
    return values.password === values.rePassword;
  },
  {
    message: 'schema_msg_password_mismatch',
    path: ["rePassword"],
  }
);

export type RegisterFormData = z.infer<typeof RegisterSchema>
