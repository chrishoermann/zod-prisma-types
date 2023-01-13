import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedBoolFilterSchema } from './NestedBoolFilterSchema';

export const NestedBoolFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBoolFilter> = z.object({
	equals: z.boolean().optional(),
	not: z.union([ z.boolean().optional(), 
 ]).optional(),}).strict();
