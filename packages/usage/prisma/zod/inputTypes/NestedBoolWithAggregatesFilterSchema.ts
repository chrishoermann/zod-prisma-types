import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedBoolWithAggregatesFilterSchema } from './NestedBoolWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedBoolFilterSchema } from './NestedBoolFilterSchema';

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBoolWithAggregatesFilter> = z.object({
	equals: z.boolean().optional(),
	not: z.union([ z.boolean().optional(), 
 ]).optional(),	_count: 	_min: 	_max: }).strict();
