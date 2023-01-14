import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { MYValueSchema } from './MYValueSchema';
import { NestedEnumMYValueFilterSchema } from './NestedEnumMYValueFilterSchema';

export const EnumMYValueFilterSchema: z.ZodType<PrismaClient.Prisma.EnumMYValueFilter> = z.object({
  equals: z.lazy(() => MYValueSchema).optional(),
  in: z.lazy(() => MYValueSchema).array().optional(),
  notIn: z.lazy(() => MYValueSchema).array().optional(),
  not: z.union([ z.lazy(() => MYValueSchema),z.lazy(() => NestedEnumMYValueFilterSchema) ]).optional(),
}).strict()