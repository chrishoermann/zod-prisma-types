import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { NonDefaultModelCountOrderByAggregateInputSchema } from './NonDefaultModelCountOrderByAggregateInputSchema';
import { NonDefaultModelAvgOrderByAggregateInputSchema } from './NonDefaultModelAvgOrderByAggregateInputSchema';
import { NonDefaultModelMaxOrderByAggregateInputSchema } from './NonDefaultModelMaxOrderByAggregateInputSchema';
import { NonDefaultModelMinOrderByAggregateInputSchema } from './NonDefaultModelMinOrderByAggregateInputSchema';
import { NonDefaultModelSumOrderByAggregateInputSchema } from './NonDefaultModelSumOrderByAggregateInputSchema';

export const NonDefaultModelOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.NonDefaultModelOrderByWithAggregationInput> = z.object({
	id: 	string: 	_count: 	_avg: 	_max: 	_min: 	_sum: }).strict();
