import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedStringWithAggregatesFilterSchema } from './NestedStringWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedStringFilterSchema } from './NestedStringFilterSchema';

export const NestedStringWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedStringWithAggregatesFilter> = z.object({
	equals: z.string().optional(),
	in: z.string().array().optional(),
	notIn: z.string().array().optional(),
	lt: z.string().optional(),
	lte: z.string().optional(),
	gt: z.string().optional(),
	gte: z.string().optional(),
	contains: z.string().optional(),
	startsWith: z.string().optional(),
	endsWith: z.string().optional(),
	not: z.union([ z.string().optional(), 
 ]).optional(),	_count: 	_min: 	_max: }).strict();