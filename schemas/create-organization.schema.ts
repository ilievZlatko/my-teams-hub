import * as z from 'zod'

export const CreateOrganizationSchema = z.object({
  name: z.string().min(1, {
    message: 'Name must be at least 1 characters.',
  }),
  description: z.string({
    message: 'Description is required',
  }),
})
