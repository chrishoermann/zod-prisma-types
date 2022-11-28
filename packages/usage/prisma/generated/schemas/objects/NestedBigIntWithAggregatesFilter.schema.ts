import { z } from 'zod';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedFloatFilterObjectSchema } from './NestedFloatFilter.schema';
import { NestedBigIntFilterObjectSchema } from './NestedBigIntFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedBigIntWithAggregatesFilter> = z
  .object({
    equals: z.bigint().optional(),
    in: z.bigint().array().optional(),
    notIn: z.bigint().array().optional(),
    lt: z.bigint().optional(),
    lte: z.bigint().optional(),
    gt: z.bigint().optional(),
    gte: z.bigint().optional(),
    not: z
      .union([
        z.bigint(),
        z.lazy(() => NestedBigIntWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _avg: z.lazy(() => NestedFloatFilterObjectSchema).optional(),
    _sum: z.lazy(() => NestedBigIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedBigIntFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedBigIntFilterObjectSchema).optional(),
  })
  .strict();

export const NestedBigIntWithAggregatesFilterObjectSchema = Schema;
