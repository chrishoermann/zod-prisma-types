import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { NestedEnumAnotherEnumFilterSchema } from './NestedEnumAnotherEnumFilterSchema';

export const EnumAnotherEnumFilterSchema: z.ZodType<PrismaClient.Prisma.EnumAnotherEnumFilter> = z.object({
	equals: 	in: 	notIn: 	not: z.union([  ]).optional(),}).strict();
