import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedIntNullableFilterSchema } from './NestedIntNullableFilterSchema';
import { NestedDateTimeNullableFilterSchema } from './NestedDateTimeNullableFilterSchema';

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.date().optional().nullable(),
  in: z.date().array().optional().nullable(),
  notIn: z.date().array().optional().nullable(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([ z.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
}).strict()