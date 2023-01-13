import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedDecimalFilterSchema } from './NestedDecimalFilterSchema';

export const DecimalFilterSchema: z.ZodType<PrismaClient.Prisma.DecimalFilter> = z.object({
	equals: 	in: 	notIn: 	lt: 	lte: 	gt: 	gte: 	not: z.union([  ]).optional(),}).strict();
