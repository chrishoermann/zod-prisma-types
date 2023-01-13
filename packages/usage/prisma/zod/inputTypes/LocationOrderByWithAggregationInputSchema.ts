import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { LocationCountOrderByAggregateInputSchema } from './LocationCountOrderByAggregateInputSchema';
import { LocationAvgOrderByAggregateInputSchema } from './LocationAvgOrderByAggregateInputSchema';
import { LocationMaxOrderByAggregateInputSchema } from './LocationMaxOrderByAggregateInputSchema';
import { LocationMinOrderByAggregateInputSchema } from './LocationMinOrderByAggregateInputSchema';
import { LocationSumOrderByAggregateInputSchema } from './LocationSumOrderByAggregateInputSchema';

export const LocationOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.LocationOrderByWithAggregationInput> = z.object({
	lat: 	lng: 	_count: 	_avg: 	_max: 	_min: 	_sum: }).strict();
