import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { AnotherEnumSchema } from './AnotherEnumSchema';

export const EnumAnotherEnumNullableListFilterSchema: z.ZodType<PrismaClient.Prisma.EnumAnotherEnumNullableListFilter> = z.object({
	equals: 	has: 	hasEvery: 	hasSome: 	isEmpty: z.boolean().optional(),
}).strict();
