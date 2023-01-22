import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { SortOrderSchema } from './SortOrderSchema';

export const NonDefaultModelMinOrderByAggregateInputSchema: z.ZodType<Prisma.NonDefaultModelMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
}).strict()

export default NonDefaultModelMinOrderByAggregateInputSchema
