import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const DecimalModelMinOrderByAggregateInputSchema: z.ZodType<Prisma.DecimalModelMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  decimalOpt: z.lazy(() => SortOrderSchema).optional(),
}).strict()

export default DecimalModelMinOrderByAggregateInputSchema