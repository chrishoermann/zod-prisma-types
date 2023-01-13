import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedFloatWithAggregatesFilterSchema } from './NestedFloatWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedFloatFilterSchema } from './NestedFloatFilterSchema';

export const FloatWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.FloatWithAggregatesFilter> = z.object({
	equals: z.number().optional(),
	in: z.number().array().optional(),
	notIn: z.number().array().optional(),
	lt: z.number().optional(),
	lte: z.number().optional(),
	gt: z.number().optional(),
	gte: z.number().optional(),
	not: z.union([ z.number().optional(), 
 ]).optional(),	_count: 	_avg: 	_sum: 	_min: 	_max: }).strict();
