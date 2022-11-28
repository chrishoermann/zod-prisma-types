import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NullableBigIntFieldUpdateOperationsInput> = z
  .object({
    set: z.bigint().optional().nullable(),
    increment: z.bigint().optional(),
    decrement: z.bigint().optional(),
    multiply: z.bigint().optional(),
    divide: z.bigint().optional(),
  })
  .strict();

export const NullableBigIntFieldUpdateOperationsInputObjectSchema = Schema;
