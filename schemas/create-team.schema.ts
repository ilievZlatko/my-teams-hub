import * as z from 'zod'

export const CreateTeamSchema = z.object({
  name: z.string().min(1, {
    message: 'schema_msg_name_required',
  }),
  description: z.string().min(1, {
    message: 'schema_msg_desc_required',
  }),
})

export type CreateTeamType = z.infer<typeof CreateTeamSchema>
