import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const NonDefaultModelSelectSchema: z.ZodType<Prisma.NonDefaultModelSelect> = z.object({
  id: z.boolean().optional(),
  string: z.boolean().optional(),
}).strict()

export default NonDefaultModelSelectSchema
