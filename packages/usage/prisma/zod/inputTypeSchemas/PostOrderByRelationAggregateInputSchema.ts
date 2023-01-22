import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { SortOrderSchema } from './SortOrderSchema';

export const PostOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PostOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict()

export default PostOrderByRelationAggregateInputSchema
