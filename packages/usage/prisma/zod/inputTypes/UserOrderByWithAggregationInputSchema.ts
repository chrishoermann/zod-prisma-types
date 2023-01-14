import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from '../enums';
import { UserCountOrderByAggregateInputSchema } from './UserCountOrderByAggregateInputSchema';
import { UserAvgOrderByAggregateInputSchema } from './UserAvgOrderByAggregateInputSchema';
import { UserMaxOrderByAggregateInputSchema } from './UserMaxOrderByAggregateInputSchema';
import { UserMinOrderByAggregateInputSchema } from './UserMinOrderByAggregateInputSchema';
import { UserSumOrderByAggregateInputSchema } from './UserSumOrderByAggregateInputSchema';

export const UserOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  enum: z.lazy(() => SortOrderSchema).optional(),
  scalarList: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional(),
}).strict()