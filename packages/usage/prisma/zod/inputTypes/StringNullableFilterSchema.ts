import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { QueryModeSchema } from './QueryModeSchema';
import { NestedStringNullableFilterSchema } from './NestedStringNullableFilterSchema';

export const StringNullableFilterSchema: z.ZodType<PrismaClient.Prisma.StringNullableFilter> = z.object({
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
 ]).optional().nullable(),}).strict();
