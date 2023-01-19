import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { MODELWithUpperCaseCountOrderByAggregateInputSchema } from './MODELWithUpperCaseCountOrderByAggregateInputSchema';
import { MODELWithUpperCaseAvgOrderByAggregateInputSchema } from './MODELWithUpperCaseAvgOrderByAggregateInputSchema';
import { MODELWithUpperCaseMaxOrderByAggregateInputSchema } from './MODELWithUpperCaseMaxOrderByAggregateInputSchema';
import { MODELWithUpperCaseMinOrderByAggregateInputSchema } from './MODELWithUpperCaseMinOrderByAggregateInputSchema';
import { MODELWithUpperCaseSumOrderByAggregateInputSchema } from './MODELWithUpperCaseSumOrderByAggregateInputSchema';

export const MODELWithUpperCaseOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  STRING: z.lazy(() => SortOrderSchema).optional(),
  MYValue: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MODELWithUpperCaseCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MODELWithUpperCaseAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MODELWithUpperCaseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MODELWithUpperCaseMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MODELWithUpperCaseSumOrderByAggregateInputSchema).optional(),
}).strict()