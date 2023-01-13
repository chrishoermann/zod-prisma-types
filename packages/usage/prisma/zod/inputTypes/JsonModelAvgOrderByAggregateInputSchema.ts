import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const JsonModelAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelAvgOrderByAggregateInput> = z.object({
	id: }).strict();
