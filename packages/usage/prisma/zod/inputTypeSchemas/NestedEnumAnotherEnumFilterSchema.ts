import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { AnotherEnumSchema } from './AnotherEnumSchema';

export const NestedEnumAnotherEnumFilterSchema: z.ZodType<Prisma.NestedEnumAnotherEnumFilter> = z.object({
  equals: z.lazy(() => AnotherEnumSchema).optional(),
  in: z.lazy(() => AnotherEnumSchema).array().optional(),
  notIn: z.lazy(() => AnotherEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => AnotherEnumSchema),z.lazy(() => NestedEnumAnotherEnumFilterSchema) ]).optional(),
}).strict()

export default NestedEnumAnotherEnumFilterSchema
