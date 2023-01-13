import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { MyPrismaScalarsTypeCountOrderByAggregateInputSchema } from './MyPrismaScalarsTypeCountOrderByAggregateInputSchema';
import { MyPrismaScalarsTypeAvgOrderByAggregateInputSchema } from './MyPrismaScalarsTypeAvgOrderByAggregateInputSchema';
import { MyPrismaScalarsTypeMaxOrderByAggregateInputSchema } from './MyPrismaScalarsTypeMaxOrderByAggregateInputSchema';
import { MyPrismaScalarsTypeMinOrderByAggregateInputSchema } from './MyPrismaScalarsTypeMinOrderByAggregateInputSchema';
import { MyPrismaScalarsTypeSumOrderByAggregateInputSchema } from './MyPrismaScalarsTypeSumOrderByAggregateInputSchema';

export const MyPrismaScalarsTypeOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeOrderByWithAggregationInput> = z.object({
	id: 	string: 	bic: 	float: 	floatOpt: 	int: 	intOpt: 	decimal: 	decimalOpt: 	date: 	dateOpt: 	bigIntOpt: 	json: 	jsonOpt: 	bytes: 	bytesOpt: 	custom: 	exclude: 	updatedAt: 	_count: 	_avg: 	_max: 	_min: 	_sum: }).strict();
