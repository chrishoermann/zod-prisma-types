import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedFloatNullableFilterSchema } from './NestedFloatNullableFilterSchema';

export const NestedFloatNullableFilterSchema: z.ZodType<PrismaClient.Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict()