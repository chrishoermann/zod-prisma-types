import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { DecimalFieldUpdateOperationsInputSchema } from './DecimalFieldUpdateOperationsInputSchema';
import { NullableDecimalFieldUpdateOperationsInputSchema } from './NullableDecimalFieldUpdateOperationsInputSchema';

export const DecimalModelUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.DecimalModelUpdateManyMutationInput> = z.object({
  decimal: z.union([ z.union([z.number(),z.string(),z.instanceof(PrismaClient.Prisma.Decimal),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  decimalOpt: z.union([ z.union([z.number(),z.string(),z.instanceof(PrismaClient.Prisma.Decimal),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict()