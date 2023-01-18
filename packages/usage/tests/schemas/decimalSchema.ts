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
  v: string | number | Prisma.Decimal | DecimalJsLike,
): v is number | string =>
  typeof v === 'number' ||
  (typeof v === 'string' && DECIMAL_STRING_REGEX.test(v));

export const isValidDecimalListInput = (
  v: string[] | number[] | Prisma.Decimal[] | DecimalJsLike[],
): v is number[] | string[] =>
  (v as number[]).every((v) => typeof v === 'number') ||
  (v as string[]).every(
    (v) => typeof v === 'string' && DECIMAL_STRING_REGEX.test(v),
  );

const isDecimalJsLike = (v: unknown): v is DecimalJsLike =>
  !!v && typeof v === 'object' && 'd' in v && 'e' in v && 's' in v;

// TEST SCHEMAS
// ------------------------------

export const DecimalListSchema = z
  .union([
    z.number().array(),
    z.string().array(),
    z.instanceof(Prisma.Decimal).array(),
    DecimalJSLikeSchema.array(),
  ])
  .transform((v) =>
    isValidDecimalListInput(v) ? v.map((v) => new Prisma.Decimal(v)) : v,
  )
  .refine(
    (v) => v.every((v) => Prisma.Decimal.isDecimal(v) || isDecimalJsLike(v)),
    {
      message: 'Field "decimal" must be a Decimal',
      path: ['Models', 'DecimalModel'],
    },
  );

export const DecimalSchema = z
  .union([
    z.number(),
    z.string(),
    z.instanceof(Prisma.Decimal),
    DecimalJSLikeSchema,
  ])
  .transform((v) => (isValidDecimalInput(v) ? new Prisma.Decimal(v) : v))
  .refine((v) => Prisma.Decimal.isDecimal(v) || isDecimalJsLike(v), {
    message: 'Field "decimal" must be a Decimal',
    path: ['Models', 'DecimalModel'],
  });

export const DecimalModelSchema = z.object({
  id: z.number().int(),
  decimal: DecimalSchema,
  decimalOpt: DecimalSchema.nullish(),
});
