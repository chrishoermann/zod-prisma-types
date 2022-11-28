import { z } from 'zod';
import { NestedFloatFilterObjectSchema } from './NestedFloatFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatFilterObjectSchema)])
      .optional(),
  })
  .strict();

export const FloatFilterObjectSchema = Schema;
