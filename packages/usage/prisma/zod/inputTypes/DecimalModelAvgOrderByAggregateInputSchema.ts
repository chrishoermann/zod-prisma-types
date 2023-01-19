import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const DecimalModelAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.DecimalModelAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  decimalOpt: z.lazy(() => SortOrderSchema).optional(),
}).strict()