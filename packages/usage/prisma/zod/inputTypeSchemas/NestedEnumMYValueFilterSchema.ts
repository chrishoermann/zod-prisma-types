import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { MYValueSchema } from './MYValueSchema';

export const NestedEnumMYValueFilterSchema: z.ZodType<Prisma.NestedEnumMYValueFilter> = z.object({
  equals: z.lazy(() => MYValueSchema).optional(),
  in: z.lazy(() => MYValueSchema).array().optional(),
  notIn: z.lazy(() => MYValueSchema).array().optional(),
  not: z.union([ z.lazy(() => MYValueSchema),z.lazy(() => NestedEnumMYValueFilterSchema) ]).optional(),
}).strict()

export default NestedEnumMYValueFilterSchema
