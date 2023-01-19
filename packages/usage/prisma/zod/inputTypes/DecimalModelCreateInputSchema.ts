import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const DecimalModelCreateInputSchema: z.ZodType<PrismaClient.Prisma.DecimalModelCreateInput> = z.object({
  decimal: z.union([z.number(),z.string(),z.instanceof(PrismaClient.Prisma.Decimal),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  decimalOpt: z.union([z.number(),z.string(),z.instanceof(PrismaClient.Prisma.Decimal),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
}).strict()