import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { DecimalModelCountOrderByAggregateInputSchema } from './DecimalModelCountOrderByAggregateInputSchema';
import { DecimalModelAvgOrderByAggregateInputSchema } from './DecimalModelAvgOrderByAggregateInputSchema';
import { DecimalModelMaxOrderByAggregateInputSchema } from './DecimalModelMaxOrderByAggregateInputSchema';
import { DecimalModelMinOrderByAggregateInputSchema } from './DecimalModelMinOrderByAggregateInputSchema';
import { DecimalModelSumOrderByAggregateInputSchema } from './DecimalModelSumOrderByAggregateInputSchema';

export const DecimalModelOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.DecimalModelOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  decimalOpt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DecimalModelCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => DecimalModelAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DecimalModelMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DecimalModelMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => DecimalModelSumOrderByAggregateInputSchema).optional(),
}).strict()