import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { SecondEnumSchema } from './SecondEnumSchema';
import { NestedEnumSecondEnumFilterSchema } from './NestedEnumSecondEnumFilterSchema';

export const EnumSecondEnumFilterSchema: z.ZodType<Prisma.EnumSecondEnumFilter> = z.object({
  equals: z.lazy(() => SecondEnumSchema).optional(),
  in: z.lazy(() => SecondEnumSchema).array().optional(),
  notIn: z.lazy(() => SecondEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => SecondEnumSchema),z.lazy(() => NestedEnumSecondEnumFilterSchema) ]).optional(),
}).strict()

export default EnumSecondEnumFilterSchema
