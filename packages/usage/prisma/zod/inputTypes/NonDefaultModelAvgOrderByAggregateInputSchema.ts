import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const NonDefaultModelAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.NonDefaultModelAvgOrderByAggregateInput> = z.object({
	id: }).strict();
