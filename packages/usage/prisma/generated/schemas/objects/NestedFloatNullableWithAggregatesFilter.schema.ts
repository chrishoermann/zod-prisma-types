import { z } from 'zod';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedFloatNullableFilterObjectSchema } from './NestedFloatNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([
        z.number(),
        z.lazy(() => NestedFloatNullableWithAggregatesFilterObjectSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
    _avg: z.lazy(() => NestedFloatNullableFilterObjectSchema).optional(),
    _sum: z.lazy(() => NestedFloatNullableFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedFloatNullableFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedFloatNullableFilterObjectSchema).optional(),
  })
  .strict();

export const NestedFloatNullableWithAggregatesFilterObjectSchema = Schema;
