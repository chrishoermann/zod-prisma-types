import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const WithDefaultValidatorsSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.WithDefaultValidatorsSumOrderByAggregateInput> = z.object({
  integer: z.lazy(() => SortOrderSchema).optional(),
}).strict()