import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { SortOrderSchema } from './SortOrderSchema';

export const JsonModelMinOrderByAggregateInputSchema: z.ZodType<Prisma.JsonModelMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict()

export default JsonModelMinOrderByAggregateInputSchema
