import { z } from 'zod';
import { NestedBigIntFilterObjectSchema } from './NestedBigIntFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.BigIntFilter> = z
  .object({
    equals: z.bigint().optional(),
    in: z.bigint().array().optional(),
    notIn: z.bigint().array().optional(),
    lt: z.bigint().optional(),
    lte: z.bigint().optional(),
    gt: z.bigint().optional(),
    gte: z.bigint().optional(),
    not: z
      .union([z.bigint(), z.lazy(() => NestedBigIntFilterObjectSchema)])
      .optional(),
  })
  .strict();

export const BigIntFilterObjectSchema = Schema;
