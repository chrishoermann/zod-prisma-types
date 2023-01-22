import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const WithDefaultValidatorsUncheckedCreateInputSchema: z.ZodType<Prisma.WithDefaultValidatorsUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  idTwo: z.string().optional(),
  integer: z.number().int(),
}).strict()

export default WithDefaultValidatorsUncheckedCreateInputSchema
