import * as z from 'zod'

export const SelectSchema = z.object({
  organisation: z.string({
    message: 'Organisation is required',
  }),

})