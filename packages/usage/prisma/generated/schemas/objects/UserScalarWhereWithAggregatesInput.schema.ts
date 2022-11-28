import { z } from 'zod';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { EnumMyValueWithAggregatesFilterObjectSchema } from './EnumMyValueWithAggregatesFilter.schema';
import { MyValueSchema } from '../enums/MyValue.schema';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema';
import { FloatNullableWithAggregatesFilterObjectSchema } from './FloatNullableWithAggregatesFilter.schema';
import { FloatWithAggregatesFilterObjectSchema } from './FloatWithAggregatesFilter.schema';
import { DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { DecimalNullableWithAggregatesFilterObjectSchema } from './DecimalNullableWithAggregatesFilter.schema';
import { BigIntWithAggregatesFilterObjectSchema } from './BigIntWithAggregatesFilter.schema';
import { BigIntNullableWithAggregatesFilterObjectSchema } from './BigIntNullableWithAggregatesFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => UserScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => UserScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    value: z
      .union([
        z.lazy(() => EnumMyValueWithAggregatesFilterObjectSchema),
        z.lazy(() => MyValueSchema),
      ])
      .optional(),
    intTwo: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    int: z
      .union([
        z.lazy(() => IntNullableWithAggregatesFilterObjectSchema),
        z.number(),
      ])
      .optional()
      .nullable(),
    floatOpt: z
      .union([
        z.lazy(() => FloatNullableWithAggregatesFilterObjectSchema),
        z.number(),
      ])
      .optional()
      .nullable(),
    float: z
      .union([z.lazy(() => FloatWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    decimal: z
      .union([
        z.lazy(() => DecimalWithAggregatesFilterObjectSchema),
        z.number(),
      ])
      .optional(),
    decimalOpt: z
      .union([
        z.lazy(() => DecimalNullableWithAggregatesFilterObjectSchema),
        z.number(),
      ])
      .optional()
      .nullable(),
    bigInt: z
      .union([z.lazy(() => BigIntWithAggregatesFilterObjectSchema), z.bigint()])
      .optional(),
    bigIntOpt: z
      .union([
        z.lazy(() => BigIntNullableWithAggregatesFilterObjectSchema),
        z.bigint(),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const UserScalarWhereWithAggregatesInputObjectSchema = Schema;
