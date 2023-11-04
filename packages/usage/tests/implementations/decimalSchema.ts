import { Prisma } from '@prisma/client';
import { DecimalJsLike } from '@prisma/client/runtime/library';
import { z } from 'zod';
import {
  DecimalJsLikeSchema,
  isValidDecimalInput,
} from '../../prisma/generated/zod';

import { Decimal } from 'decimal.js';

// TYPEGURADS
// ------------------------------

export const DECIMAL_STRING_REGEX = /^[0-9.,e+\-bxffo_cp]+$|Infinity|NaN/;
export const REFINED_DECIMAL_STRING_REGEX =
  /^(NaN|Infinity|(-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?|(-?0[bB][01]+(\.[01]*)?|0[oO][0-7]+(\.[0-7]*)?|0[xX][\da-fA-F]+(\.[\da-fA-F]*)?)(p[+-]?\d+)?))$/;

// TEST SCHEMAS
// ------------------------------

export const DecimalListSchema = z
  .union([
    z.number().array(),
    z.string().array(),
    z.instanceof(Decimal).array(),
    z.instanceof(Prisma.Decimal).array(),
    DecimalJsLikeSchema.array(),
  ])
  .refine(
    (v) =>
      Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)),
    { message: 'Must be a Decimal' },
  );

const transformDecimal = (value: any) => {
  if (value instanceof Prisma.Decimal) return value;
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return value;
  if (
    typeof value === 'object' &&
    'd' in value &&
    'e' in value &&
    's' in value &&
    'toFixed' in value
  )
    return value;
  // return new Prisma.Decimal(value.toString());
};

export const DecimalSchema = z
  .union([
    z.number(),
    z.string(),
    z.instanceof(Decimal),
    z.instanceof(Prisma.Decimal),
    DecimalJsLikeSchema,
  ])
  .refine((v) => isValidDecimalInput(v), {
    message: 'Field "decimal" must be a Decimal',
    path: ['Models', 'DecimalModel'],
  });

// export const DecimalSchema = z
//   .union([
//     z.number(),
//     z.string(),
//     DecimalJsLikeSchema,
//     z.instanceof(Prisma.Decimal),
//   ])
// .refine((v) => isValidDecimalInput(v), {
//   message: 'Field "decimal" must be a Decimal',
//   path: ['Models', 'DecimalModel'],
// });

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
