import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const PostMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PostMaxOrderByAggregateInput> = z.object({
	id: 	title: 	content: 	published: 	authorId: }).strict();
