import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const JsonModelSumOrderByAggregateInputSchema: z.ZodType<Prisma.JsonModelSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict()

export default JsonModelSumOrderByAggregateInputSchema
