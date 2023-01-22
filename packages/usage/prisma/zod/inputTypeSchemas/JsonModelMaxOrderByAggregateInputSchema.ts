import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { SortOrderSchema } from './SortOrderSchema';

export const JsonModelMaxOrderByAggregateInputSchema: z.ZodType<Prisma.JsonModelMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict()

export default JsonModelMaxOrderByAggregateInputSchema
