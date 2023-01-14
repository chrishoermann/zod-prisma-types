import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedDecimalNullableWithAggregatesFilterSchema } from './NestedDecimalNullableWithAggregatesFilterSchema';
import { NestedIntNullableFilterSchema } from './NestedIntNullableFilterSchema';
import { NestedDecimalNullableFilterSchema } from './NestedDecimalNullableFilterSchema';

export const NestedDecimalNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedDecimalNullableWithAggregatesFilter> = z.object({
  equals: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional().nullable(),
  notIn: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional().nullable(),
  lt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
}).strict()