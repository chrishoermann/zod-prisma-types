import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from '../enums';

export const NonDefaultModelMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.NonDefaultModelMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
}).strict()