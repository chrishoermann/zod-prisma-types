import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const NonDefaultModelSumOrderByAggregateInputSchema: z.ZodType<Prisma.NonDefaultModelSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict()

export default NonDefaultModelSumOrderByAggregateInputSchema
