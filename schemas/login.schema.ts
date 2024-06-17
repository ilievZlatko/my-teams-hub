import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z
    .string()
    .min(1, {
      message: 'Password is required',
    })
    .max(72, {
      message: 'Password is not valid',
    }),
  rememberMe: z.boolean().default(false).optional(),
});
