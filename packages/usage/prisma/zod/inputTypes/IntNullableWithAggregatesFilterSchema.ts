import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedIntNullableWithAggregatesFilterSchema } from './NestedIntNullableWithAggregatesFilterSchema';
import { NestedIntNullableFilterSchema } from './NestedIntNullableFilterSchema';
import { NestedFloatNullableFilterSchema } from './NestedFloatNullableFilterSchema';

export const IntNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.IntNullableWithAggregatesFilter> = z.object({
	equals: z.number().optional().nullable(),
	in: z.number().array().optional().nullable(),
	notIn: z.number().array().optional().nullable(),
	lt: z.number().optional(),
	lte: z.number().optional(),
	gt: z.number().optional(),
	gte: z.number().optional(),
	not: z.union([ z.number().optional().nullable(), 
 ]).optional().nullable(),	_count: 	_avg: 	_sum: 	_min: 	_max: }).strict();
