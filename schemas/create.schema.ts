import * as z from 'zod'

export const CreateSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 characters.",
  }),
  description: z.string({
    message: 'Description is required',
  }),
  logo: z.string({
    message: 'Logo is required',
  }),
})
