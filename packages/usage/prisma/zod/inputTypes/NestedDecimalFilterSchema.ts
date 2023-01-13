import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedDecimalFilterSchema } from './NestedDecimalFilterSchema';

export const NestedDecimalFilterSchema: z.ZodType<PrismaClient.Prisma.NestedDecimalFilter> = z.object({
	equals: 	in: 	notIn: 	lt: 	lte: 	gt: 	gte: 	not: z.union([  ]).optional(),}).strict();
