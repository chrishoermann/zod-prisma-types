import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { QueryModeSchema } from './QueryModeSchema';
import { NestedStringFilterSchema } from './NestedStringFilterSchema';

export const StringFilterSchema: z.ZodType<PrismaClient.Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict()