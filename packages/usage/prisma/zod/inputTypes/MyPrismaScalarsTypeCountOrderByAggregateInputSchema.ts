import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const MyPrismaScalarsTypeCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeCountOrderByAggregateInput> = z.object({
	id: 	string: 	bic: 	float: 	floatOpt: 	int: 	intOpt: 	decimal: 	decimalOpt: 	date: 	dateOpt: 	bigIntOpt: 	json: 	jsonOpt: 	bytes: 	bytesOpt: 	custom: 	exclude: 	updatedAt: }).strict();
