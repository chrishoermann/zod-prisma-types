import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { PostCreateanotherEnumInputSchema } from './PostCreateanotherEnumInputSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';

export const PostCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.PostCreateManyInput> = z.object({
	id: z.number().int().optional(),
	title: z.string(),
	content: z.string().optional().nullable(),
	published: z.boolean().optional(),
	authorId: z.string(),
	anotherEnum: z.union([  ]).optional(),}).strict();
