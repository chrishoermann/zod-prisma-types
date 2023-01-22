import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { SortOrderSchema } from './SortOrderSchema';

export const NonDefaultModelAvgOrderByAggregateInputSchema: z.ZodType<Prisma.NonDefaultModelAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict()

export default NonDefaultModelAvgOrderByAggregateInputSchema
