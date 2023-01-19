import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { MYValueSchema } from './MYValueSchema';

export const NestedEnumMYValueFilterSchema: z.ZodType<PrismaClient.Prisma.NestedEnumMYValueFilter> = z.object({
  equals: z.lazy(() => MYValueSchema).optional(),
  in: z.lazy(() => MYValueSchema).array().optional(),
  notIn: z.lazy(() => MYValueSchema).array().optional(),
  not: z.union([ z.lazy(() => MYValueSchema),z.lazy(() => NestedEnumMYValueFilterSchema) ]).optional(),
}).strict()