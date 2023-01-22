import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { SortOrderSchema } from './SortOrderSchema';

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict()

export default UserOrderByRelationAggregateInputSchema
