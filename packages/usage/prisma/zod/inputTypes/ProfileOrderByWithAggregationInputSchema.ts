import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { ProfileCountOrderByAggregateInputSchema } from './ProfileCountOrderByAggregateInputSchema';
import { ProfileAvgOrderByAggregateInputSchema } from './ProfileAvgOrderByAggregateInputSchema';
import { ProfileMaxOrderByAggregateInputSchema } from './ProfileMaxOrderByAggregateInputSchema';
import { ProfileMinOrderByAggregateInputSchema } from './ProfileMinOrderByAggregateInputSchema';
import { ProfileSumOrderByAggregateInputSchema } from './ProfileSumOrderByAggregateInputSchema';

export const ProfileOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.ProfileOrderByWithAggregationInput> = z.object({
	id: 	bio: 	userId: 	role: 	second: 	_count: 	_avg: 	_max: 	_min: 	_sum: }).strict();
