import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const JsonModelMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict()