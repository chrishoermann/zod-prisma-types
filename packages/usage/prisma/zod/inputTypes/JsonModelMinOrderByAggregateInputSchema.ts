import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from '../enums';

export const JsonModelMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict()