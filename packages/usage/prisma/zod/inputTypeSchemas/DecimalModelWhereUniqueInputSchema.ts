import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const DecimalModelWhereUniqueInputSchema: z.ZodType<Prisma.DecimalModelWhereUniqueInput> = z.object({
  id: z.number().optional(),
}).strict()

export default DecimalModelWhereUniqueInputSchema
