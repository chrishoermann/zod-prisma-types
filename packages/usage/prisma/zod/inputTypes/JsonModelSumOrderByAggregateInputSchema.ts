import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const JsonModelSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelSumOrderByAggregateInput> = z.object({
	id: }).strict();
