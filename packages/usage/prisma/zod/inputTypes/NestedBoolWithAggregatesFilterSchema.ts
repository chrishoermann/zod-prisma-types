import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedBoolFilterSchema } from './NestedBoolFilterSchema';

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
}).strict()