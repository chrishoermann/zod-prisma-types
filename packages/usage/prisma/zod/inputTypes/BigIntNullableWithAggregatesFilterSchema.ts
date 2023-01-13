import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedBigIntNullableWithAggregatesFilterSchema } from './NestedBigIntNullableWithAggregatesFilterSchema';
import { NestedIntNullableFilterSchema } from './NestedIntNullableFilterSchema';
import { NestedFloatNullableFilterSchema } from './NestedFloatNullableFilterSchema';
import { NestedBigIntNullableFilterSchema } from './NestedBigIntNullableFilterSchema';

export const BigIntNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.BigIntNullableWithAggregatesFilter> = z.object({
	equals: z.bigint().optional().nullable(),
	in: z.bigint().array().optional().nullable(),
	notIn: z.bigint().array().optional().nullable(),
	lt: z.bigint().optional(),
	lte: z.bigint().optional(),
	gt: z.bigint().optional(),
	gte: z.bigint().optional(),
	not: z.union([ z.bigint().optional().nullable(), 
 ]).optional().nullable(),	_count: 	_avg: 	_sum: 	_min: 	_max: }).strict();
