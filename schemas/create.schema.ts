import * as z from 'zod'

export const CreateSchema = z.object({
  name: z.string({
    message: 'Name is required',
  }),
  description: z.string({
    message: 'Description is required',
  }),
  logo: z.string({
    message: 'Logo is required',
  }),
})