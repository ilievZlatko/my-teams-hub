import * as z from 'zod'

export const RegisterSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  email: z.string().email(),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  password: z.string().min(6),
  rePassword: z.string().min(6),
  check: z.literal<boolean>(true, {
    errorMap: () => ({ message: 'You have to agree!' }),
  }),
}).refine(
  (values) => {
    return values.password === values.rePassword;
  },
  {
    message: "Passwords must match!",
    path: ["rePassword"],
  }
);

export type RegisterFormData = z.infer<typeof RegisterSchema>
