import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { MODELWithUpperCaseCountOrderByAggregateInputSchema } from './MODELWithUpperCaseCountOrderByAggregateInputSchema';
import { MODELWithUpperCaseAvgOrderByAggregateInputSchema } from './MODELWithUpperCaseAvgOrderByAggregateInputSchema';
import { MODELWithUpperCaseMaxOrderByAggregateInputSchema } from './MODELWithUpperCaseMaxOrderByAggregateInputSchema';
import { MODELWithUpperCaseMinOrderByAggregateInputSchema } from './MODELWithUpperCaseMinOrderByAggregateInputSchema';
import { MODELWithUpperCaseSumOrderByAggregateInputSchema } from './MODELWithUpperCaseSumOrderByAggregateInputSchema';

export const MODELWithUpperCaseOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseOrderByWithAggregationInput> = z.object({
	id: 	STRING: 	MYValue: 	_count: 	_avg: 	_max: 	_min: 	_sum: }).strict();
