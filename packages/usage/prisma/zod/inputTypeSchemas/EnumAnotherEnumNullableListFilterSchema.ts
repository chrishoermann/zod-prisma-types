import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { AnotherEnumSchema } from './AnotherEnumSchema';

export const EnumAnotherEnumNullableListFilterSchema: z.ZodType<Prisma.EnumAnotherEnumNullableListFilter> = z.object({
  equals: z.lazy(() => AnotherEnumSchema).array().optional().nullable(),
  has: z.lazy(() => AnotherEnumSchema).optional().nullable(),
  hasEvery: z.lazy(() => AnotherEnumSchema).array().optional(),
  hasSome: z.lazy(() => AnotherEnumSchema).array().optional(),
  isEmpty: z.boolean().optional(),
}).strict()

export default EnumAnotherEnumNullableListFilterSchema
