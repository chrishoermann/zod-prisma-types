import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const PostSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PostSumOrderByAggregateInput> = z.object({
	id: }).strict();
