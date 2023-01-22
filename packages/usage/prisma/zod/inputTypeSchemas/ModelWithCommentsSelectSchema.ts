import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const ModelWithCommentsSelectSchema: z.ZodType<Prisma.ModelWithCommentsSelect> = z.object({
  id: z.boolean().optional(),
  string: z.boolean().optional(),
  omitField: z.boolean().optional(),
  omitRequired: z.boolean().optional(),
}).strict()

export default ModelWithCommentsSelectSchema
