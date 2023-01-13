import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedBytesWithAggregatesFilterSchema } from './NestedBytesWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedBytesFilterSchema } from './NestedBytesFilterSchema';

export const NestedBytesWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBytesWithAggregatesFilter> = z.object({
	equals: 	in: 	notIn: 	not: z.union([  ]).optional(),	_count: 	_min: 	_max: }).strict();
