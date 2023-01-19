import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const NonDefaultModelCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.NonDefaultModelCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
}).strict()