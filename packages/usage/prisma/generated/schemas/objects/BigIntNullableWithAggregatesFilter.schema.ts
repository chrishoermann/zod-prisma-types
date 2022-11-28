import { z } from 'zod';
import { NestedBigIntNullableWithAggregatesFilterObjectSchema } from './NestedBigIntNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedFloatNullableFilterObjectSchema } from './NestedFloatNullableFilter.schema';
import { NestedBigIntNullableFilterObjectSchema } from './NestedBigIntNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.BigIntNullableWithAggregatesFilter> = z
  .object({
    equals: z.bigint().optional().nullable(),
    in: z.bigint().array().optional().nullable(),
    notIn: z.bigint().array().optional().nullable(),
    lt: z.bigint().optional(),
    lte: z.bigint().optional(),
    gt: z.bigint().optional(),
    gte: z.bigint().optional(),
    not: z
      .union([
        z.bigint(),
        z.lazy(() => NestedBigIntNullableWithAggregatesFilterObjectSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
    _avg: z.lazy(() => NestedFloatNullableFilterObjectSchema).optional(),
    _sum: z.lazy(() => NestedBigIntNullableFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedBigIntNullableFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedBigIntNullableFilterObjectSchema).optional(),
  })
  .strict();

export const BigIntNullableWithAggregatesFilterObjectSchema = Schema;
