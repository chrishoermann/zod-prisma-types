import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const MODELWithUpperCaseAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MODELWithUpperCaseAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict()

export default MODELWithUpperCaseAvgOrderByAggregateInputSchema
