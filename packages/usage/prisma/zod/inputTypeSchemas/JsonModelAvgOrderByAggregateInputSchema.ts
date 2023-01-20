import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const JsonModelAvgOrderByAggregateInputSchema: z.ZodType<Prisma.JsonModelAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict()

export default JsonModelAvgOrderByAggregateInputSchema
