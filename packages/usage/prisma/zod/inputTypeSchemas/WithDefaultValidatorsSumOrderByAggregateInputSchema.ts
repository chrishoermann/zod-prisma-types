import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { SortOrderSchema } from './SortOrderSchema';

export const WithDefaultValidatorsSumOrderByAggregateInputSchema: z.ZodType<Prisma.WithDefaultValidatorsSumOrderByAggregateInput> = z.object({
  integer: z.lazy(() => SortOrderSchema).optional(),
}).strict()

export default WithDefaultValidatorsSumOrderByAggregateInputSchema
