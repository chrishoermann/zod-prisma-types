import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { AnotherEnumSchema } from './AnotherEnumSchema';

export const EnumAnotherEnumNullableListFilterSchema: z.ZodType<PrismaClient.Prisma.EnumAnotherEnumNullableListFilter> = z.object({
  equals: z.lazy(() => AnotherEnumSchema).array().optional().nullable(),
  has: z.lazy(() => AnotherEnumSchema).optional().nullable(),
  hasEvery: z.lazy(() => AnotherEnumSchema).array().optional(),
  hasSome: z.lazy(() => AnotherEnumSchema).array().optional(),
  isEmpty: z.boolean().optional(),
}).strict()