import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const MyPrismaScalarsTypeAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeAvgOrderByAggregateInput> = z.object({
	float: 	floatOpt: 	int: 	intOpt: 	decimal: 	decimalOpt: 	bigIntOpt: }).strict();
