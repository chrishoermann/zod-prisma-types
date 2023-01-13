import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const WithDefaultValidatorsAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.WithDefaultValidatorsAvgOrderByAggregateInput> = z.object({
	integer: }).strict();
