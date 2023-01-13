import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { PostCountOrderByAggregateInputSchema } from './PostCountOrderByAggregateInputSchema';
import { PostAvgOrderByAggregateInputSchema } from './PostAvgOrderByAggregateInputSchema';
import { PostMaxOrderByAggregateInputSchema } from './PostMaxOrderByAggregateInputSchema';
import { PostMinOrderByAggregateInputSchema } from './PostMinOrderByAggregateInputSchema';
import { PostSumOrderByAggregateInputSchema } from './PostSumOrderByAggregateInputSchema';

export const PostOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.PostOrderByWithAggregationInput> = z.object({
	id: 	title: 	content: 	published: 	authorId: 	anotherEnum: 	_count: 	_avg: 	_max: 	_min: 	_sum: }).strict();
