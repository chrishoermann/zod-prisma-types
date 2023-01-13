import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedBoolFilterSchema } from './NestedBoolFilterSchema';

export const BoolFilterSchema: z.ZodType<PrismaClient.Prisma.BoolFilter> = z.object({
	equals: z.boolean().optional(),
	not: z.union([ z.boolean().optional(), 
 ]).optional(),}).strict();
