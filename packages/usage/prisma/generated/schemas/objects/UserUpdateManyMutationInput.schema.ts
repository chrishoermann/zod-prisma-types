import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { MyValueSchema } from '../enums/MyValue.schema';
import { EnumMyValueFieldUpdateOperationsInputObjectSchema } from './EnumMyValueFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { NullableFloatFieldUpdateOperationsInputObjectSchema } from './NullableFloatFieldUpdateOperationsInput.schema';
import { FloatFieldUpdateOperationsInputObjectSchema } from './FloatFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { NullableDecimalFieldUpdateOperationsInputObjectSchema } from './NullableDecimalFieldUpdateOperationsInput.schema';
import { BigIntFieldUpdateOperationsInputObjectSchema } from './BigIntFieldUpdateOperationsInput.schema';
import { NullableBigIntFieldUpdateOperationsInputObjectSchema } from './NullableBigIntFieldUpdateOperationsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z
  .object({
    id: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    name: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    value: z
      .union([
        z.lazy(() => MyValueSchema),
        z.lazy(() => EnumMyValueFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    intTwo: z
      .union([
        z.number(),
        z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    int: z
      .union([
        z.number(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    floatOpt: z
      .union([
        z.number(),
        z.lazy(() => NullableFloatFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    float: z
      .union([
        z.number(),
        z.lazy(() => FloatFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    decimal: z
      .union([
        z.number(),
        z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    decimalOpt: z
      .union([
        z.number(),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    bigInt: z
      .union([
        z.bigint(),
        z.lazy(() => BigIntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    bigIntOpt: z
      .union([
        z.bigint(),
        z.lazy(() => NullableBigIntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const UserUpdateManyMutationInputObjectSchema = Schema;
