import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { SortOrderSchema } from './SortOrderSchema';

export const WithDefaultValidatorsOrderByWithRelationInputSchema: z.ZodType<Prisma.WithDefaultValidatorsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idTwo: z.lazy(() => SortOrderSchema).optional(),
  integer: z.lazy(() => SortOrderSchema).optional(),
}).strict()

export default WithDefaultValidatorsOrderByWithRelationInputSchema
