import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const ModelWithOmitFieldsSelectSchema: z.ZodType<Prisma.ModelWithOmitFieldsSelect> = z.object({
  id: z.boolean().optional(),
  string: z.boolean().optional(),
  omitField: z.boolean().optional(),
  omitRequired: z.boolean().optional(),
}).strict()

export default ModelWithOmitFieldsSelectSchema
