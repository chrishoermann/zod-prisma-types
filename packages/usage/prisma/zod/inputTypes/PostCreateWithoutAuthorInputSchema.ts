import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { PostCreateanotherEnumInputSchema } from './PostCreateanotherEnumInputSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';

export const PostCreateWithoutAuthorInputSchema: z.ZodType<PrismaClient.Prisma.PostCreateWithoutAuthorInput> = z.object({
	title: z.string(),
	content: z.string().optional().nullable(),
	published: z.boolean().optional(),
	anotherEnum: z.union([  ]).optional(),}).strict();
