import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { UserCountOrderByAggregateInputSchema } from './UserCountOrderByAggregateInputSchema';
import { UserAvgOrderByAggregateInputSchema } from './UserAvgOrderByAggregateInputSchema';
import { UserMaxOrderByAggregateInputSchema } from './UserMaxOrderByAggregateInputSchema';
import { UserMinOrderByAggregateInputSchema } from './UserMinOrderByAggregateInputSchema';
import { UserSumOrderByAggregateInputSchema } from './UserSumOrderByAggregateInputSchema';

export const UserOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.UserOrderByWithAggregationInput> = z.object({
	id: 	email: 	name: 	role: 	enum: 	scalarList: 	lat: 	lng: 	_count: 	_avg: 	_max: 	_min: 	_sum: }).strict();
