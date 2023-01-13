import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedBigIntNullableFilterSchema } from './NestedBigIntNullableFilterSchema';

export const NestedBigIntNullableFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBigIntNullableFilter> = z.object({
	equals: z.bigint().optional().nullable(),
	in: z.bigint().array().optional().nullable(),
	notIn: z.bigint().array().optional().nullable(),
	lt: z.bigint().optional(),
	lte: z.bigint().optional(),
	gt: z.bigint().optional(),
	gte: z.bigint().optional(),
	not: z.union([ z.bigint().optional().nullable(), 
 ]).optional().nullable(),}).strict();
