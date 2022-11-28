import { z } from 'zod';
import { MyValueSchema } from '../enums/MyValue.schema';
import { NestedEnumMyValueFilterObjectSchema } from './NestedEnumMyValueFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumMyValueFilter> = z
  .object({
    equals: z.lazy(() => MyValueSchema).optional(),
    in: z
      .lazy(() => MyValueSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => MyValueSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => MyValueSchema),
        z.lazy(() => NestedEnumMyValueFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const EnumMyValueFilterObjectSchema = Schema;
