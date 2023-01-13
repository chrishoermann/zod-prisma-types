import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedFloatFilterSchema } from './NestedFloatFilterSchema';

export const NestedFloatFilterSchema: z.ZodType<PrismaClient.Prisma.NestedFloatFilter> = z.object({
	equals: z.number().optional(),
	in: z.number().array().optional(),
	notIn: z.number().array().optional(),
	lt: z.number().optional(),
	lte: z.number().optional(),
	gt: z.number().optional(),
	gte: z.number().optional(),
	not: z.union([ z.number().optional(), 
 ]).optional(),}).strict();
