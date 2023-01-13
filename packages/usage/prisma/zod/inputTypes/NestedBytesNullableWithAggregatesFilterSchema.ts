import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedBytesNullableWithAggregatesFilterSchema } from './NestedBytesNullableWithAggregatesFilterSchema';
import { NestedIntNullableFilterSchema } from './NestedIntNullableFilterSchema';
import { NestedBytesNullableFilterSchema } from './NestedBytesNullableFilterSchema';

export const NestedBytesNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBytesNullableWithAggregatesFilter> = z.object({
	equals: 	in: 	notIn: 	not: z.union([  ]).optional().nullable(),	_count: 	_min: 	_max: }).strict();
