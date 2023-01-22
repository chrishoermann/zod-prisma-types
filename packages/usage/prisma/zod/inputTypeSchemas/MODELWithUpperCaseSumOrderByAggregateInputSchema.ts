import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { SortOrderSchema } from './SortOrderSchema';

export const MODELWithUpperCaseSumOrderByAggregateInputSchema: z.ZodType<Prisma.MODELWithUpperCaseSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict()

export default MODELWithUpperCaseSumOrderByAggregateInputSchema
