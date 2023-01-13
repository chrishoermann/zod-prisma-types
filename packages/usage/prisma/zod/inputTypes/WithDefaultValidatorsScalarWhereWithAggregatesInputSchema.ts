import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { WithDefaultValidatorsScalarWhereWithAggregatesInputSchema } from './WithDefaultValidatorsScalarWhereWithAggregatesInputSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';

export const WithDefaultValidatorsScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.WithDefaultValidatorsScalarWhereWithAggregatesInput> = z.object({
	AND: z.union([  ]).optional(),	OR: 	NOT: z.union([  ]).optional(),	id: z.union([ z.string().optional() ]).optional(),	idTwo: z.union([ z.string().optional() ]).optional(),	integer: z.union([ z.number().optional() ]).optional(),}).strict();
