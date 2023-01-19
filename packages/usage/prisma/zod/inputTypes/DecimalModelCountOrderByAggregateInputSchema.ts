import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const DecimalModelCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.DecimalModelCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  decimalOpt: z.lazy(() => SortOrderSchema).optional(),
}).strict()