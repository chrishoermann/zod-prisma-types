import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedBytesWithAggregatesFilterSchema } from './NestedBytesWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedBytesFilterSchema } from './NestedBytesFilterSchema';

export const NestedBytesWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBytesWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBytesFilterSchema).optional(),
  _max: z.lazy(() => NestedBytesFilterSchema).optional(),
}).strict()