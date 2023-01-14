import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SecondEnumSchema } from './SecondEnumSchema';
import { NestedEnumSecondEnumFilterSchema } from './NestedEnumSecondEnumFilterSchema';

export const EnumSecondEnumFilterSchema: z.ZodType<PrismaClient.Prisma.EnumSecondEnumFilter> = z.object({
  equals: z.lazy(() => SecondEnumSchema).optional(),
  in: z.lazy(() => SecondEnumSchema).array().optional(),
  notIn: z.lazy(() => SecondEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => SecondEnumSchema),z.lazy(() => NestedEnumSecondEnumFilterSchema) ]).optional(),
}).strict()