import * as z from 'zod'

export const CreateTeamSchema = z.object({
  name: z.string().min(1, {
    message: 'Name must be at least 1 characters.',
  }),
  description: z.string().min(1, {
    message: 'Description must be at least 1 characters.',
  }),
})

export type CreateTeamType = z.infer<typeof CreateTeamSchema>
