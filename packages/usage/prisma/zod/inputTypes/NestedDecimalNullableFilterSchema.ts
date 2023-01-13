import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedDecimalNullableFilterSchema } from './NestedDecimalNullableFilterSchema';

export const NestedDecimalNullableFilterSchema: z.ZodType<PrismaClient.Prisma.NestedDecimalNullableFilter> = z.object({
	equals: 	in: 	notIn: 	lt: 	lte: 	gt: 	gte: 	not: z.union([  ]).optional().nullable(),}).strict();
