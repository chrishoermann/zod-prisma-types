import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const PostMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PostMinOrderByAggregateInput> = z.object({
	id: 	title: 	content: 	published: 	authorId: }).strict();
