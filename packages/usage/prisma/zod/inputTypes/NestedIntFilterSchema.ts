import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';

export const NestedIntFilterSchema: z.ZodType<PrismaClient.Prisma.NestedIntFilter> = z.object({
	equals: z.number().optional(),
	in: z.number().array().optional(),
	notIn: z.number().array().optional(),
	lt: z.number().optional(),
	lte: z.number().optional(),
	gt: z.number().optional(),
	gte: z.number().optional(),
	not: z.union([ z.number().optional(), 
 ]).optional(),}).strict();
