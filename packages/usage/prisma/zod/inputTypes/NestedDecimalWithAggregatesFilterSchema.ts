import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedDecimalWithAggregatesFilterSchema } from './NestedDecimalWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedDecimalFilterSchema } from './NestedDecimalFilterSchema';

export const NestedDecimalWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedDecimalWithAggregatesFilter> = z.object({
	equals: 	in: 	notIn: 	lt: 	lte: 	gt: 	gte: 	not: z.union([  ]).optional(),	_count: 	_avg: 	_sum: 	_min: 	_max: }).strict();