import { z } from 'zod';
import { NestedDecimalFilterObjectSchema } from './NestedDecimalFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DecimalFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedDecimalFilterObjectSchema)])
      .optional(),
  })
  .strict();

export const DecimalFilterObjectSchema = Schema;
