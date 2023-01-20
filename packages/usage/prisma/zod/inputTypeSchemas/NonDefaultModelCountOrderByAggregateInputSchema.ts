import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const NonDefaultModelCountOrderByAggregateInputSchema: z.ZodType<Prisma.NonDefaultModelCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
}).strict()

export default NonDefaultModelCountOrderByAggregateInputSchema
