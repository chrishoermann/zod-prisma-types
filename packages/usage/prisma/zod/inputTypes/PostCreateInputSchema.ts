import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserCreateNestedOneWithoutPostsInputSchema } from './UserCreateNestedOneWithoutPostsInputSchema';
import { PostCreateanotherEnumInputSchema } from './PostCreateanotherEnumInputSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';

export const PostCreateInputSchema: z.ZodType<PrismaClient.Prisma.PostCreateInput> = z.object({
	title: z.string(),
	content: z.string().optional().nullable(),
	published: z.boolean().optional(),
	author: 	anotherEnum: z.union([  ]).optional(),}).strict();
