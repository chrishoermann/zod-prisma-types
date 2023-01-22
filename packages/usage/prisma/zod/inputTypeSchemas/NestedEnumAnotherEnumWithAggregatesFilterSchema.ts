import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumAnotherEnumFilterSchema } from './NestedEnumAnotherEnumFilterSchema';

export const NestedEnumAnotherEnumWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumAnotherEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AnotherEnumSchema).optional(),
  in: z.lazy(() => AnotherEnumSchema).array().optional(),
  notIn: z.lazy(() => AnotherEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => AnotherEnumSchema),z.lazy(() => NestedEnumAnotherEnumWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAnotherEnumFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAnotherEnumFilterSchema).optional(),
}).strict()

export default NestedEnumAnotherEnumWithAggregatesFilterSchema
