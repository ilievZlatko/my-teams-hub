import * as z from 'zod'

export const CreateOrganizationSchema = z.object({
  name: z.string().min(1, {
    message: 'schema_msg_name_required',
  }),
  description: z.string({
    message: 'schema_msg_desc_required',
  }),
})

export type CreateOrganizationType = z.infer<typeof CreateOrganizationSchema>
