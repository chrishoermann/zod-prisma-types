import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { DecimalJSLikeSchema, isValidDecimalInput } from '.';

export const DecimalModelCreateInputSchema: z.ZodType<Prisma.DecimalModelCreateInput> = z.object({
  decimal: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  decimalOpt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
}).strict()

export default DecimalModelCreateInputSchema
