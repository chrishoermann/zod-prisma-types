import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { z } from 'zod';

const AcceptedDecimalInput = z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  z.instanceof(Decimal),
]);
const AcceptedDecimalListInput = z.union([
  z.number().array(),
  z.string().array(),
  z.instanceof(Prisma.Decimal).array(),
  z.instanceof(Decimal).array(),
]);

const isValidDecimalInput = (
  v: string | number | Prisma.Decimal | Decimal,
): v is number | string =>
  typeof v === 'number' || (typeof v === 'string' && !!v.match(/[0-9.]/));

const isValidDecimalListInput = (
  v: string[] | number[] | Prisma.Decimal[] | Decimal[],
): v is number[] | string[] =>
  (v as number[]).every((v) => typeof v === 'number') ||
  (v as string[]).every((v) => typeof v === 'string' && !!v.match(/[0-9.]/));

// implementation that should work
const test = z
  .union([
    z.number().array(),
    z.string().array(),
    z.instanceof(Prisma.Decimal).array(),
    z.instanceof(Decimal).array(),
  ])
  .transform((v) =>
    isValidDecimalListInput(v) ? v.map((v) => new Prisma.Decimal(v)) : v,
  )
  .refine((v) => v.every((v) => Prisma.Decimal.isDecimal(v)), {
    message: 'Must be a Decimal',
  })
  .optional();

export const decimalSchema = z
  .union(
    [
      z.number(),
      z.string(),
      z.instanceof(Prisma.Decimal),
      z.instanceof(Decimal),
    ],
    {
      invalid_type_error: 'Field "decimal" must be a Decimal',
    },
  )
  .transform((v) => (isValidDecimalInput(v) ? new Prisma.Decimal(v) : v))
  .refine((v) => Prisma.Decimal.isDecimal(v), {
    message: 'Field "decimal" must be a Decimal',
    path: ['Models', 'DecimalModel'],
  });

export const DecimalModelSchema = z.object({
  id: z.number().int(),
  decimal: z
    .any()
    .transform((v) => (isValidDecimalInput(v) ? new Prisma.Decimal(v) : v))
    .refine((v) => Prisma.Decimal.isDecimal(v), {
      message: 'Field "decimal" must be a Decimal',
      path: ['Models', 'DecimalModel'],
    }),
  decimalOpt: z
    .any()
    .transform((v) => (isValidDecimalInput(v) ? new Prisma.Decimal(v) : v))
    .refine((v) => Prisma.Decimal.isDecimal(v), {
      message: 'Field "decimalOpt" must be a Decimal',
      path: ['Models', 'DecimalModel'],
    })
    .nullish(),
});
