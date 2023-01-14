import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedDecimalFilterSchema } from './NestedDecimalFilterSchema';

export const NestedDecimalFilterSchema: z.ZodType<PrismaClient.Prisma.NestedDecimalFilter> = z.object({
  equals: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  in: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional(),
  notIn: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional(),
  lt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalFilterSchema) ]).optional(),
}).strict()