import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { NestedEnumAnotherEnumFilterSchema } from './NestedEnumAnotherEnumFilterSchema';

export const NestedEnumAnotherEnumFilterSchema: z.ZodType<PrismaClient.Prisma.NestedEnumAnotherEnumFilter> = z.object({
	equals: 	in: 	notIn: 	not: z.union([  ]).optional(),}).strict();
