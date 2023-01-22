import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const NonDefaultModelWhereUniqueInputSchema: z.ZodType<Prisma.NonDefaultModelWhereUniqueInput> = z.object({
  id: z.number().optional(),
}).strict()

export default NonDefaultModelWhereUniqueInputSchema
