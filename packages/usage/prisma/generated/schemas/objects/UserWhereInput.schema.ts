import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumMyValueFilterObjectSchema } from './EnumMyValueFilter.schema';
import { MyValueSchema } from '../enums/MyValue.schema';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { FloatNullableFilterObjectSchema } from './FloatNullableFilter.schema';
import { FloatFilterObjectSchema } from './FloatFilter.schema';
import { DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema';
import { BigIntFilterObjectSchema } from './BigIntFilter.schema';
import { BigIntNullableFilterObjectSchema } from './BigIntNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserWhereInputObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserWhereInputObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    value: z
      .union([
        z.lazy(() => EnumMyValueFilterObjectSchema),
        z.lazy(() => MyValueSchema),
      ])
      .optional(),
    intTwo: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    int: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    floatOpt: z
      .union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    float: z
      .union([z.lazy(() => FloatFilterObjectSchema), z.number()])
      .optional(),
    decimal: z
      .union([z.lazy(() => DecimalFilterObjectSchema), z.number()])
      .optional(),
    decimalOpt: z
      .union([z.lazy(() => DecimalNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    bigInt: z
      .union([z.lazy(() => BigIntFilterObjectSchema), z.bigint()])
      .optional(),
    bigIntOpt: z
      .union([z.lazy(() => BigIntNullableFilterObjectSchema), z.bigint()])
      .optional()
      .nullable(),
  })
  .strict();

export const UserWhereInputObjectSchema = Schema;
