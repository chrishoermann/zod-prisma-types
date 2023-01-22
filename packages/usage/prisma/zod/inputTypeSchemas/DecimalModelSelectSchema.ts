import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const DecimalModelSelectSchema: z.ZodType<Prisma.DecimalModelSelect> = z.object({
  id: z.boolean().optional(),
  decimal: z.boolean().optional(),
  decimalOpt: z.boolean().optional(),
}).strict()

export default DecimalModelSelectSchema
