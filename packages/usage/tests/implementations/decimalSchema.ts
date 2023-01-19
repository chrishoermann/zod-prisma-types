import { Prisma } from '@prisma/client';
import { DecimalJsLike } from '@prisma/client/runtime';
import { z } from 'zod';

export const DecimalJSLikeSchema = z.object({
  d: z.array(z.number()),
  e: z.number(),
  s: z.number(),
});

// TYPEGURADS
// ------------------------------

export const DECIMAL_STRING_REGEX = /^[0-9.,e+\-bxffo_cp]+$|Infinity|NaN/;

export const isValidDecimalInput = (
  v?: null | string | number | Prisma.Decimal | DecimalJsLike,
) => {
  if (!v) return false;
  return (
    (typeof v === 'object' && Prisma.Decimal.isDecimal(v)) ||
    (typeof v === 'object' && 'd' in v && 'e' in v && 's' in v) ||
    (typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) ||
    typeof v === 'number'
  );
};
// TEST SCHEMAS
// ------------------------------

export const DecimalListSchema = z
  .union([
    z.number().array(),
    z.string().array(),
    z.instanceof(Prisma.Decimal).array(),
    DecimalJSLikeSchema.array(),
  ])
  .refine((v) => (v as any[]).every((v) => isValidDecimalInput(v)), {
    message: 'Field "decimal" must be a Decimal',
    path: ['Models', 'DecimalModel'],
  });

export const DecimalSchema = z
  .union([
    z.number(),
    z.string(),
    z.instanceof(Prisma.Decimal),
    DecimalJSLikeSchema,
  ])
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
