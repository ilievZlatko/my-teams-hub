import * as z from 'zod'

export const searchSchema = z.object({
  search: z.string().min(1, {
    message: 'Search must not be empty.',
  }),
})

export type searchType = z.infer<typeof searchSchema>
