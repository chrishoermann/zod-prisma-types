import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedDateTimeFilterSchema } from './NestedDateTimeFilterSchema';

export const NestedDateTimeFilterSchema: z.ZodType<PrismaClient.Prisma.NestedDateTimeFilter> = z.object({
	equals: z.date().optional(),
	in: z.date().array().optional(),
	notIn: z.date().array().optional(),
	lt: z.date().optional(),
	lte: z.date().optional(),
	gt: z.date().optional(),
	gte: z.date().optional(),
	not: z.union([ z.date().optional(), 
 ]).optional(),}).strict();
