import { z } from 'zod';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedDecimalNullableFilterObjectSchema } from './NestedDecimalNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedDecimalNullableWithAggregatesFilter> = z
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
        z.lazy(() => NestedDecimalNullableWithAggregatesFilterObjectSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
    _avg: z.lazy(() => NestedDecimalNullableFilterObjectSchema).optional(),
    _sum: z.lazy(() => NestedDecimalNullableFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedDecimalNullableFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedDecimalNullableFilterObjectSchema).optional(),
  })
  .strict();

export const NestedDecimalNullableWithAggregatesFilterObjectSchema = Schema;
