import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedBigIntNullableWithAggregatesFilterSchema } from './NestedBigIntNullableWithAggregatesFilterSchema';
import { NestedIntNullableFilterSchema } from './NestedIntNullableFilterSchema';
import { NestedFloatNullableFilterSchema } from './NestedFloatNullableFilterSchema';
import { NestedBigIntNullableFilterSchema } from './NestedBigIntNullableFilterSchema';

export const NestedBigIntNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBigIntNullableWithAggregatesFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
}).strict()