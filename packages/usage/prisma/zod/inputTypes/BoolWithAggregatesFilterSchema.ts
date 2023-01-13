import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedBoolWithAggregatesFilterSchema } from './NestedBoolWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedBoolFilterSchema } from './NestedBoolFilterSchema';

export const BoolWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.BoolWithAggregatesFilter> = z.object({
	equals: z.boolean().optional(),
	not: z.union([ z.boolean().optional(), 
 ]).optional(),	_count: 	_min: 	_max: }).strict();
