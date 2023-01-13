import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { QueryModeSchema } from './QueryModeSchema';
import { NestedStringNullableWithAggregatesFilterSchema } from './NestedStringNullableWithAggregatesFilterSchema';
import { NestedIntNullableFilterSchema } from './NestedIntNullableFilterSchema';
import { NestedStringNullableFilterSchema } from './NestedStringNullableFilterSchema';

export const StringNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.StringNullableWithAggregatesFilter> = z.object({
	equals: z.string().optional().nullable(),
	in: z.string().array().optional().nullable(),
	notIn: z.string().array().optional().nullable(),
	lt: z.string().optional(),
	lte: z.string().optional(),
	gt: z.string().optional(),
	gte: z.string().optional(),
	contains: z.string().optional(),
	startsWith: z.string().optional(),
	endsWith: z.string().optional(),
	mode: 	not: z.union([ z.string().optional().nullable(), 
 ]).optional().nullable(),	_count: 	_min: 	_max: }).strict();
