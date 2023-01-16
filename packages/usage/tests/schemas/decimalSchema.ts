import { Prisma } from '@prisma/client';
import { z } from 'zod';

const isValidDecimalInput = (v: any) =>
  typeof v === 'number' ||
  (typeof v === 'object' && Prisma.Decimal.isDecimal(v)) ||
  (typeof v === 'string' && v.match(/[0-9.]/));

export const decimalSchema = z
  .any()
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
