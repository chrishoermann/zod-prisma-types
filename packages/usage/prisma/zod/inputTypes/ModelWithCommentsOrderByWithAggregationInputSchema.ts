import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { ModelWithCommentsCountOrderByAggregateInputSchema } from './ModelWithCommentsCountOrderByAggregateInputSchema';
import { ModelWithCommentsMaxOrderByAggregateInputSchema } from './ModelWithCommentsMaxOrderByAggregateInputSchema';
import { ModelWithCommentsMinOrderByAggregateInputSchema } from './ModelWithCommentsMinOrderByAggregateInputSchema';

export const ModelWithCommentsOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsOrderByWithAggregationInput> = z.object({
	id: 	string: 	omitField: 	omitRequired: 	_count: 	_max: 	_min: }).strict();
