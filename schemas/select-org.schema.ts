import * as z from 'zod'

export const SelectOrgSchema = z.object({
  organisation: z.string({
    message: 'schema_msg_require',
  }),
})
