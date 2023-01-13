import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SecondEnumSchema } from './SecondEnumSchema';
import { NestedEnumSecondEnumFilterSchema } from './NestedEnumSecondEnumFilterSchema';

export const EnumSecondEnumFilterSchema: z.ZodType<PrismaClient.Prisma.EnumSecondEnumFilter> = z.object({
	equals: 	in: 	notIn: 	not: z.union([  ]).optional(),}).strict();
