import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const ModelWithCommentsCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsCountOrderByAggregateInput> = z.object({
	id: 	string: 	omitField: 	omitRequired: }).strict();
