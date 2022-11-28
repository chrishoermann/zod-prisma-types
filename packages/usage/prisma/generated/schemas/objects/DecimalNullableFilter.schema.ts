import { z } from 'zod';
import { NestedDecimalNullableFilterObjectSchema } from './NestedDecimalNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DecimalNullableFilter> = z
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
        z.lazy(() => NestedDecimalNullableFilterObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const DecimalNullableFilterObjectSchema = Schema;
