import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { SortOrderSchema } from './SortOrderSchema';
import { ModelWithCommentsCountOrderByAggregateInputSchema } from './ModelWithCommentsCountOrderByAggregateInputSchema';
import { ModelWithCommentsMaxOrderByAggregateInputSchema } from './ModelWithCommentsMaxOrderByAggregateInputSchema';
import { ModelWithCommentsMinOrderByAggregateInputSchema } from './ModelWithCommentsMinOrderByAggregateInputSchema';

export const ModelWithCommentsOrderByWithAggregationInputSchema: z.ZodType<Prisma.ModelWithCommentsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  omitField: z.lazy(() => SortOrderSchema).optional(),
  omitRequired: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ModelWithCommentsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ModelWithCommentsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ModelWithCommentsMinOrderByAggregateInputSchema).optional(),
}).strict()

export default ModelWithCommentsOrderByWithAggregationInputSchema
