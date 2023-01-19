import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const WithDefaultValidatorsCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.WithDefaultValidatorsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idTwo: z.lazy(() => SortOrderSchema).optional(),
  integer: z.lazy(() => SortOrderSchema).optional(),
}).strict()