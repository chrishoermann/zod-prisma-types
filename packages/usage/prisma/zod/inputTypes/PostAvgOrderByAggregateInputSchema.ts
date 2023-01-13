import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const PostAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PostAvgOrderByAggregateInput> = z.object({
	id: }).strict();
