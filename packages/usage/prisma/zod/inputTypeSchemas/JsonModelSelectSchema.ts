import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const JsonModelSelectSchema: z.ZodType<Prisma.JsonModelSelect> = z.object({
  id: z.boolean().optional(),
  json: z.boolean().optional(),
  jsonOpt: z.boolean().optional(),
}).strict()

export default JsonModelSelectSchema
