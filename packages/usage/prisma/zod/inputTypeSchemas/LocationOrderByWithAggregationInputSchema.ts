import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { SortOrderSchema } from './SortOrderSchema';
import { LocationCountOrderByAggregateInputSchema } from './LocationCountOrderByAggregateInputSchema';
import { LocationAvgOrderByAggregateInputSchema } from './LocationAvgOrderByAggregateInputSchema';
import { LocationMaxOrderByAggregateInputSchema } from './LocationMaxOrderByAggregateInputSchema';
import { LocationMinOrderByAggregateInputSchema } from './LocationMinOrderByAggregateInputSchema';
import { LocationSumOrderByAggregateInputSchema } from './LocationSumOrderByAggregateInputSchema';

export const LocationOrderByWithAggregationInputSchema: z.ZodType<Prisma.LocationOrderByWithAggregationInput> = z.object({
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LocationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LocationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LocationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LocationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LocationSumOrderByAggregateInputSchema).optional(),
}).strict()

export default LocationOrderByWithAggregationInputSchema
