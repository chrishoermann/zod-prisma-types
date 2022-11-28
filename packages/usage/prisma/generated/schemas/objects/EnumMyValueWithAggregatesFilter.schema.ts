import { z } from 'zod';
import { MyValueSchema } from '../enums/MyValue.schema';
import { NestedEnumMyValueWithAggregatesFilterObjectSchema } from './NestedEnumMyValueWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumMyValueFilterObjectSchema } from './NestedEnumMyValueFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumMyValueWithAggregatesFilter> = z
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
        z.lazy(() => NestedEnumMyValueWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumMyValueFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumMyValueFilterObjectSchema).optional(),
  })
  .strict();

export const EnumMyValueWithAggregatesFilterObjectSchema = Schema;
