import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedBytesWithAggregatesFilterSchema } from './NestedBytesWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedBytesFilterSchema } from './NestedBytesFilterSchema';

export const BytesWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.BytesWithAggregatesFilter> = z.object({
	equals: 	in: 	notIn: 	not: z.union([  ]).optional(),	_count: 	_min: 	_max: }).strict();
