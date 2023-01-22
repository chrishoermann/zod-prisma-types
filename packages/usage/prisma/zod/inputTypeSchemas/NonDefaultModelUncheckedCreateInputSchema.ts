import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const NonDefaultModelUncheckedCreateInputSchema: z.ZodType<Prisma.NonDefaultModelUncheckedCreateInput> = z.object({
  id: z.number().int(),
  string: z.string(),
}).strict()

export default NonDefaultModelUncheckedCreateInputSchema
