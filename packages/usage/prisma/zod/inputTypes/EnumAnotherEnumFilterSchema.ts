import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { NestedEnumAnotherEnumFilterSchema } from './NestedEnumAnotherEnumFilterSchema';

export const EnumAnotherEnumFilterSchema: z.ZodType<PrismaClient.Prisma.EnumAnotherEnumFilter> = z.object({
  equals: z.lazy(() => AnotherEnumSchema).optional(),
  in: z.lazy(() => AnotherEnumSchema).array().optional(),
  notIn: z.lazy(() => AnotherEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => AnotherEnumSchema),z.lazy(() => NestedEnumAnotherEnumFilterSchema) ]).optional(),
}).strict()