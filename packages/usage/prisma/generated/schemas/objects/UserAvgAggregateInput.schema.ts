import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserAvgAggregateInputType> = z
  .object({
    intTwo: z.literal(true).optional(),
    int: z.literal(true).optional(),
    floatOpt: z.literal(true).optional(),
    float: z.literal(true).optional(),
    decimal: z.literal(true).optional(),
    decimalOpt: z.literal(true).optional(),
    bigInt: z.literal(true).optional(),
    bigIntOpt: z.literal(true).optional(),
  })
  .strict();

export const UserAvgAggregateInputObjectSchema = Schema;
