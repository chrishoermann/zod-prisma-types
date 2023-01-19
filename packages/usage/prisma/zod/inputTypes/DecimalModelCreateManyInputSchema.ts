import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const DecimalModelCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.DecimalModelCreateManyInput> = z.object({
  id: z.number().int().optional(),
  decimal: z.union([z.number(),z.string(),z.instanceof(PrismaClient.Prisma.Decimal),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  decimalOpt: z.union([z.number(),z.string(),z.instanceof(PrismaClient.Prisma.Decimal),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
}).strict()