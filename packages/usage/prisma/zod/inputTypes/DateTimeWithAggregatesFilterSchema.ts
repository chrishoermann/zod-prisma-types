import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedDateTimeWithAggregatesFilterSchema } from './NestedDateTimeWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedDateTimeFilterSchema } from './NestedDateTimeFilterSchema';

export const DateTimeWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.DateTimeWithAggregatesFilter> = z.object({
	equals: z.date().optional(),
	in: z.date().array().optional(),
	notIn: z.date().array().optional(),
	lt: z.date().optional(),
	lte: z.date().optional(),
	gt: z.date().optional(),
	gte: z.date().optional(),
	not: z.union([ z.date().optional(), 
 ]).optional(),	_count: 	_min: 	_max: }).strict();
