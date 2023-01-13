import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { JsonModelCountOrderByAggregateInputSchema } from './JsonModelCountOrderByAggregateInputSchema';
import { JsonModelAvgOrderByAggregateInputSchema } from './JsonModelAvgOrderByAggregateInputSchema';
import { JsonModelMaxOrderByAggregateInputSchema } from './JsonModelMaxOrderByAggregateInputSchema';
import { JsonModelMinOrderByAggregateInputSchema } from './JsonModelMinOrderByAggregateInputSchema';
import { JsonModelSumOrderByAggregateInputSchema } from './JsonModelSumOrderByAggregateInputSchema';

export const JsonModelOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelOrderByWithAggregationInput> = z.object({
	id: 	json: 	jsonOpt: 	_count: 	_avg: 	_max: 	_min: 	_sum: }).strict();
