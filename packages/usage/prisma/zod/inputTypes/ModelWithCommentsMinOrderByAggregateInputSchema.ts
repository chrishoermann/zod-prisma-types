import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const ModelWithCommentsMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsMinOrderByAggregateInput> = z.object({
	id: 	string: 	omitField: 	omitRequired: }).strict();
