import { Prisma } from '@prisma/client';
import { DecimalJsLike } from '@prisma/client/runtime';
import { z } from 'zod';
import {
  DecimalJSLikeSchema,
  isValidDecimalInput,
} from '../../prisma/generated/zod';

// TYPEGURADS
// ------------------------------

export const DECIMAL_STRING_REGEX = /^[0-9.,e+\-bxffo_cp]+$|Infinity|NaN/;

// TEST SCHEMAS
// ------------------------------

export const DecimalListSchema = z
  .union([z.number().array(), z.string().array(), DecimalJSLikeSchema.array()])
  .refine((v) => (v as any[]).every((v) => isValidDecimalInput(v)), {
    message: 'Field "decimal" must be a Decimal',
    path: ['Models', 'DecimalModel'],
  });

export const DecimalSchema = z
  .union([z.number(), z.string(), DecimalJSLikeSchema])
  .refine((v) => isValidDecimalInput(v), {
    message: 'Field "decimal" must be a Decimal',
    path: ['Models', 'DecimalModel'],
  });

export const DecimalModelSchema = z.object({
  id: z.number().int(),
  decimal: DecimalSchema,
  decimalOpt: DecimalSchema.nullish(),
});

export const DecimalListModelSchema = z.object({
  id: z.number().int(),
  decimal: DecimalListSchema,
  decimalOpt: DecimalListSchema.nullish(),
});
