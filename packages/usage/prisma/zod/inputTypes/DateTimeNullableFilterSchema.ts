import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedDateTimeNullableFilterSchema } from './NestedDateTimeNullableFilterSchema';

export const DateTimeNullableFilterSchema: z.ZodType<PrismaClient.Prisma.DateTimeNullableFilter> = z.object({
  equals: z.date().optional().nullable(),
  in: z.date().array().optional().nullable(),
  notIn: z.date().array().optional().nullable(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([ z.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict()