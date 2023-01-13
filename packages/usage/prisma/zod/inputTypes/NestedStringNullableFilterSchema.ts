import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedStringNullableFilterSchema } from './NestedStringNullableFilterSchema';

export const NestedStringNullableFilterSchema: z.ZodType<PrismaClient.Prisma.NestedStringNullableFilter> = z.object({
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
	not: z.union([ z.string().optional().nullable(), 
 ]).optional().nullable(),}).strict();
