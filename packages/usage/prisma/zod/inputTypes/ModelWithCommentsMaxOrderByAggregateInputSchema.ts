import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const ModelWithCommentsMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsMaxOrderByAggregateInput> = z.object({
	id: 	string: 	omitField: 	omitRequired: }).strict();
