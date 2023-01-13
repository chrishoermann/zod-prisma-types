import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { JsonModelScalarWhereWithAggregatesInputSchema } from './JsonModelScalarWhereWithAggregatesInputSchema';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { JsonWithAggregatesFilterSchema } from './JsonWithAggregatesFilterSchema';
import { JsonNullableWithAggregatesFilterSchema } from './JsonNullableWithAggregatesFilterSchema';

export const JsonModelScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelScalarWhereWithAggregatesInput> = z.object({
	AND: z.union([  ]).optional(),	OR: 	NOT: z.union([  ]).optional(),	id: z.union([ z.number().optional() ]).optional(),	json: 	jsonOpt: }).strict();
