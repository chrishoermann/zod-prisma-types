import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from '../enums';

export const MODELWithUpperCaseCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  STRING: z.lazy(() => SortOrderSchema).optional(),
  MYValue: z.lazy(() => SortOrderSchema).optional(),
}).strict()