import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const NullableDecimalFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.NullableDecimalFieldUpdateOperationsInput> = z.object({
  set: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional().nullable(),
  increment: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  decrement: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  multiply: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  divide: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
}).strict()