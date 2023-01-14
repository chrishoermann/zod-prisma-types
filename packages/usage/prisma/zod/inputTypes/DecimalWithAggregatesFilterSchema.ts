import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedDecimalWithAggregatesFilterSchema } from './NestedDecimalWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedDecimalFilterSchema } from './NestedDecimalFilterSchema';

export const DecimalWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.DecimalWithAggregatesFilter> = z.object({
  equals: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  in: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional(),
  notIn: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional(),
  lt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalFilterSchema).optional(),
}).strict()