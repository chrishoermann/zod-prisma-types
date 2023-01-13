import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { ModelWithOmitFieldsCountOrderByAggregateInputSchema } from './ModelWithOmitFieldsCountOrderByAggregateInputSchema';
import { ModelWithOmitFieldsMaxOrderByAggregateInputSchema } from './ModelWithOmitFieldsMaxOrderByAggregateInputSchema';
import { ModelWithOmitFieldsMinOrderByAggregateInputSchema } from './ModelWithOmitFieldsMinOrderByAggregateInputSchema';

export const ModelWithOmitFieldsOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsOrderByWithAggregationInput> = z.object({
	id: 	string: 	omitField: 	omitRequired: 	_count: 	_max: 	_min: }).strict();
