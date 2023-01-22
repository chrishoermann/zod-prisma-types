import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const WithDefaultValidatorsSelectSchema: z.ZodType<Prisma.WithDefaultValidatorsSelect> = z.object({
  id: z.boolean().optional(),
  idTwo: z.boolean().optional(),
  integer: z.boolean().optional(),
}).strict()

export default WithDefaultValidatorsSelectSchema
