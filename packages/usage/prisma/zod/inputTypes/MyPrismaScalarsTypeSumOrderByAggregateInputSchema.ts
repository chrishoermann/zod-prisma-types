import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const MyPrismaScalarsTypeSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeSumOrderByAggregateInput> = z.object({
	float: 	floatOpt: 	int: 	intOpt: 	decimal: 	decimalOpt: 	bigIntOpt: }).strict();
