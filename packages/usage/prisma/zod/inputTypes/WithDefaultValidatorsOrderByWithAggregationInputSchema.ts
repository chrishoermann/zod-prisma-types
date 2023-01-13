import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { WithDefaultValidatorsCountOrderByAggregateInputSchema } from './WithDefaultValidatorsCountOrderByAggregateInputSchema';
import { WithDefaultValidatorsAvgOrderByAggregateInputSchema } from './WithDefaultValidatorsAvgOrderByAggregateInputSchema';
import { WithDefaultValidatorsMaxOrderByAggregateInputSchema } from './WithDefaultValidatorsMaxOrderByAggregateInputSchema';
import { WithDefaultValidatorsMinOrderByAggregateInputSchema } from './WithDefaultValidatorsMinOrderByAggregateInputSchema';
import { WithDefaultValidatorsSumOrderByAggregateInputSchema } from './WithDefaultValidatorsSumOrderByAggregateInputSchema';

export const WithDefaultValidatorsOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.WithDefaultValidatorsOrderByWithAggregationInput> = z.object({
	id: 	idTwo: 	integer: 	_count: 	_avg: 	_max: 	_min: 	_sum: }).strict();
