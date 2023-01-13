import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const PostCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PostCountOrderByAggregateInput> = z.object({
	id: 	title: 	content: 	published: 	authorId: 	anotherEnum: }).strict();
