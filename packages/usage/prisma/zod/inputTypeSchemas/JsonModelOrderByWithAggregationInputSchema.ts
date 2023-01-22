import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { SortOrderSchema } from './SortOrderSchema';
import { JsonModelCountOrderByAggregateInputSchema } from './JsonModelCountOrderByAggregateInputSchema';
import { JsonModelAvgOrderByAggregateInputSchema } from './JsonModelAvgOrderByAggregateInputSchema';
import { JsonModelMaxOrderByAggregateInputSchema } from './JsonModelMaxOrderByAggregateInputSchema';
import { JsonModelMinOrderByAggregateInputSchema } from './JsonModelMinOrderByAggregateInputSchema';
import { JsonModelSumOrderByAggregateInputSchema } from './JsonModelSumOrderByAggregateInputSchema';

export const JsonModelOrderByWithAggregationInputSchema: z.ZodType<Prisma.JsonModelOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  json: z.lazy(() => SortOrderSchema).optional(),
  jsonOpt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => JsonModelCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => JsonModelAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => JsonModelMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => JsonModelMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => JsonModelSumOrderByAggregateInputSchema).optional(),
}).strict()

export default JsonModelOrderByWithAggregationInputSchema
