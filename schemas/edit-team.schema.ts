import * as z from 'zod'

export const EditTeamSchema = z.object({
  name: z.string().min(1, {
    message: 'schema_msg_name_require',
  }),
  description: z.string().optional(),
  teamMembers: z.custom<TeamMember>().array().optional(),
  otherUsers: z.custom<IUser>().array().optional(),
})

export type EditTeamType = z.infer<typeof EditTeamSchema>
