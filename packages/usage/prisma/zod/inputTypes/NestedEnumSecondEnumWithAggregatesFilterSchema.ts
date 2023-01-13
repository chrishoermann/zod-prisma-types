import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SecondEnumSchema } from './SecondEnumSchema';
import { NestedEnumSecondEnumWithAggregatesFilterSchema } from './NestedEnumSecondEnumWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumSecondEnumFilterSchema } from './NestedEnumSecondEnumFilterSchema';

export const NestedEnumSecondEnumWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedEnumSecondEnumWithAggregatesFilter> = z.object({
	equals: 	in: 	notIn: 	not: z.union([  ]).optional(),	_count: 	_min: 	_max: }).strict();
