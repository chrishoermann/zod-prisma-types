import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { WithDefaultValidatorsCountOrderByAggregateInputSchema } from './WithDefaultValidatorsCountOrderByAggregateInputSchema';
import { WithDefaultValidatorsAvgOrderByAggregateInputSchema } from './WithDefaultValidatorsAvgOrderByAggregateInputSchema';
import { WithDefaultValidatorsMaxOrderByAggregateInputSchema } from './WithDefaultValidatorsMaxOrderByAggregateInputSchema';
import { WithDefaultValidatorsMinOrderByAggregateInputSchema } from './WithDefaultValidatorsMinOrderByAggregateInputSchema';
import { WithDefaultValidatorsSumOrderByAggregateInputSchema } from './WithDefaultValidatorsSumOrderByAggregateInputSchema';

export const WithDefaultValidatorsOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.WithDefaultValidatorsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idTwo: z.lazy(() => SortOrderSchema).optional(),
  integer: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => WithDefaultValidatorsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => WithDefaultValidatorsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WithDefaultValidatorsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WithDefaultValidatorsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => WithDefaultValidatorsSumOrderByAggregateInputSchema).optional(),
}).strict()