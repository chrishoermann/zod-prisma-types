import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const NonDefaultModelSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.NonDefaultModelSumOrderByAggregateInput> = z.object({
	id: }).strict();
