import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const NonDefaultModelMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NonDefaultModelMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
}).strict()

export default NonDefaultModelMaxOrderByAggregateInputSchema
