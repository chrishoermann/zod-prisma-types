import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const WithDefaultValidatorsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.WithDefaultValidatorsAvgOrderByAggregateInput> = z.object({
  integer: z.lazy(() => SortOrderSchema).optional(),
}).strict()

export default WithDefaultValidatorsAvgOrderByAggregateInputSchema
