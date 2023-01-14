import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedDecimalNullableFilterSchema } from './NestedDecimalNullableFilterSchema';

export const NestedDecimalNullableFilterSchema: z.ZodType<PrismaClient.Prisma.NestedDecimalNullableFilter> = z.object({
  equals: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional().nullable(),
  notIn: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional().nullable(),
  lt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalNullableFilterSchema) ]).optional().nullable(),
}).strict()