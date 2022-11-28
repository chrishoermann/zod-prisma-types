import { z } from 'zod';
import { MyValueSchema } from '../enums/MyValue.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateManyInput> = z
  .object({
    id: z.string().optional(),
    name: z.string().optional().nullable(),
    value: z.lazy(() => MyValueSchema),
    intTwo: z.number(),
    int: z.number().optional().nullable(),
    floatOpt: z.number().optional().nullable(),
    float: z.number(),
    decimal: z.number(),
    decimalOpt: z.number().optional().nullable(),
    bigInt: z.bigint(),
    bigIntOpt: z.bigint().optional().nullable(),
  })
  .strict();

export const UserCreateManyInputObjectSchema = Schema;
