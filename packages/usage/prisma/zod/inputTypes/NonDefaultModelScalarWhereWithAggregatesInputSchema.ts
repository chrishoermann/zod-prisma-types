import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NonDefaultModelScalarWhereWithAggregatesInputSchema } from './NonDefaultModelScalarWhereWithAggregatesInputSchema';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';

export const NonDefaultModelScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.NonDefaultModelScalarWhereWithAggregatesInput> = z.object({
	AND: z.union([  ]).optional(),	OR: 	NOT: z.union([  ]).optional(),	id: z.union([ z.number().optional() ]).optional(),	string: z.union([ z.string().optional() ]).optional(),}).strict();
