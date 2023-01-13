import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { UserOrderByWithRelationInputSchema } from './UserOrderByWithRelationInputSchema';

export const PostOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.PostOrderByWithRelationInput> = z.object({
	id: 	title: 	content: 	published: 	author: 	authorId: 	anotherEnum: }).strict();
