import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedDateTimeNullableWithAggregatesFilterSchema } from './NestedDateTimeNullableWithAggregatesFilterSchema';
import { NestedIntNullableFilterSchema } from './NestedIntNullableFilterSchema';
import { NestedDateTimeNullableFilterSchema } from './NestedDateTimeNullableFilterSchema';

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
	equals: z.date().optional().nullable(),
	in: z.date().array().optional().nullable(),
	notIn: z.date().array().optional().nullable(),
	lt: z.date().optional(),
	lte: z.date().optional(),
	gt: z.date().optional(),
	gte: z.date().optional(),
	not: z.union([ z.date().optional().nullable(), 
 ]).optional().nullable(),	_count: 	_min: 	_max: }).strict();
