import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { SecondEnumSchema } from './SecondEnumSchema';
import { NestedEnumSecondEnumWithAggregatesFilterSchema } from './NestedEnumSecondEnumWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumSecondEnumFilterSchema } from './NestedEnumSecondEnumFilterSchema';

export const EnumSecondEnumWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSecondEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SecondEnumSchema).optional(),
  in: z.lazy(() => SecondEnumSchema).array().optional(),
  notIn: z.lazy(() => SecondEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => SecondEnumSchema),z.lazy(() => NestedEnumSecondEnumWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSecondEnumFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSecondEnumFilterSchema).optional(),
}).strict()

export default EnumSecondEnumWithAggregatesFilterSchema
