import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedDecimalNullableFilterSchema } from './NestedDecimalNullableFilterSchema';

export const DecimalNullableFilterSchema: z.ZodType<PrismaClient.Prisma.DecimalNullableFilter> = z.object({
	equals: 	in: 	notIn: 	lt: 	lte: 	gt: 	gte: 	not: z.union([  ]).optional().nullable(),}).strict();
