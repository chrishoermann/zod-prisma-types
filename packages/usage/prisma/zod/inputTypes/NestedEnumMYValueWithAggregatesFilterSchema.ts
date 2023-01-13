import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { MYValueSchema } from './MYValueSchema';
import { NestedEnumMYValueWithAggregatesFilterSchema } from './NestedEnumMYValueWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumMYValueFilterSchema } from './NestedEnumMYValueFilterSchema';

export const NestedEnumMYValueWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedEnumMYValueWithAggregatesFilter> = z.object({
	equals: 	in: 	notIn: 	not: z.union([  ]).optional(),	_count: 	_min: 	_max: }).strict();
