import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from '../enums';
import { ProfileCountOrderByAggregateInputSchema } from './ProfileCountOrderByAggregateInputSchema';
import { ProfileAvgOrderByAggregateInputSchema } from './ProfileAvgOrderByAggregateInputSchema';
import { ProfileMaxOrderByAggregateInputSchema } from './ProfileMaxOrderByAggregateInputSchema';
import { ProfileMinOrderByAggregateInputSchema } from './ProfileMinOrderByAggregateInputSchema';
import { ProfileSumOrderByAggregateInputSchema } from './ProfileSumOrderByAggregateInputSchema';

export const ProfileOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.ProfileOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  second: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProfileCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProfileAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProfileMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProfileMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProfileSumOrderByAggregateInputSchema).optional(),
}).strict()