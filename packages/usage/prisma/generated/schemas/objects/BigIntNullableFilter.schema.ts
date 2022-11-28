import { z } from 'zod';
import { NestedBigIntNullableFilterObjectSchema } from './NestedBigIntNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.BigIntNullableFilter> = z
  .object({
    equals: z.bigint().optional().nullable(),
    in: z.bigint().array().optional().nullable(),
    notIn: z.bigint().array().optional().nullable(),
    lt: z.bigint().optional(),
    lte: z.bigint().optional(),
    gt: z.bigint().optional(),
    gte: z.bigint().optional(),
    not: z
      .union([z.bigint(), z.lazy(() => NestedBigIntNullableFilterObjectSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const BigIntNullableFilterObjectSchema = Schema;
