import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const NestedBytesFilterSchema: z.ZodType<Prisma.NestedBytesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesFilterSchema) ]).optional(),
}).strict()

export default NestedBytesFilterSchema
