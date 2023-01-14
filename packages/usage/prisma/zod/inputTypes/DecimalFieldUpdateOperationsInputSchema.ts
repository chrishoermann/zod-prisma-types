import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const DecimalFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.DecimalFieldUpdateOperationsInput> = z.object({
  set: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  increment: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  decrement: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  multiply: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  divide: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
}).strict()