import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.BigIntFieldUpdateOperationsInput> = z
  .object({
    set: z.bigint().optional(),
    increment: z.bigint().optional(),
    decrement: z.bigint().optional(),
    multiply: z.bigint().optional(),
    divide: z.bigint().optional(),
  })
  .strict();

export const BigIntFieldUpdateOperationsInputObjectSchema = Schema;
