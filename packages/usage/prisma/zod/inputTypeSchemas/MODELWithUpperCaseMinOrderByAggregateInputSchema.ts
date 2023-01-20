import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const MODELWithUpperCaseMinOrderByAggregateInputSchema: z.ZodType<Prisma.MODELWithUpperCaseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  STRING: z.lazy(() => SortOrderSchema).optional(),
  MYValue: z.lazy(() => SortOrderSchema).optional(),
}).strict()

export default MODELWithUpperCaseMinOrderByAggregateInputSchema
