import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedFloatFilterSchema } from './NestedFloatFilterSchema';

export const FloatFilterSchema: z.ZodType<PrismaClient.Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict()