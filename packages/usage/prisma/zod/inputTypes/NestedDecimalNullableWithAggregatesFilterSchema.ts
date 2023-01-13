import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedDecimalNullableWithAggregatesFilterSchema } from './NestedDecimalNullableWithAggregatesFilterSchema';
import { NestedIntNullableFilterSchema } from './NestedIntNullableFilterSchema';
import { NestedDecimalNullableFilterSchema } from './NestedDecimalNullableFilterSchema';

export const NestedDecimalNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedDecimalNullableWithAggregatesFilter> = z.object({
	equals: 	in: 	notIn: 	lt: 	lte: 	gt: 	gte: 	not: z.union([  ]).optional().nullable(),	_count: 	_avg: 	_sum: 	_min: 	_max: }).strict();
