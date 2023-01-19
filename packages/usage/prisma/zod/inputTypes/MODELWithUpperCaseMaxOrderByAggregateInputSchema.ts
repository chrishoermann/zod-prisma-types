import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const MODELWithUpperCaseMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  STRING: z.lazy(() => SortOrderSchema).optional(),
  MYValue: z.lazy(() => SortOrderSchema).optional(),
}).strict()