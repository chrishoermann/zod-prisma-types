import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from '../enums';

export const WithDefaultValidatorsAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.WithDefaultValidatorsAvgOrderByAggregateInput> = z.object({
  integer: z.lazy(() => SortOrderSchema).optional(),
}).strict()