import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const MyPrismaScalarsTypeMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeMinOrderByAggregateInput> = z.object({
	id: 	string: 	bic: 	float: 	floatOpt: 	int: 	intOpt: 	decimal: 	decimalOpt: 	date: 	dateOpt: 	bigIntOpt: 	bytes: 	bytesOpt: 	custom: 	exclude: 	updatedAt: }).strict();
