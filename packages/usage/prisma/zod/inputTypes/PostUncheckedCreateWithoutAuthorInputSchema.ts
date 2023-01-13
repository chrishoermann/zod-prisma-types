import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { PostCreateanotherEnumInputSchema } from './PostCreateanotherEnumInputSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';

export const PostUncheckedCreateWithoutAuthorInputSchema: z.ZodType<PrismaClient.Prisma.PostUncheckedCreateWithoutAuthorInput> = z.object({
	id: z.number().optional(),
	title: z.string(),
	content: z.string().optional().nullable(),
	published: z.boolean().optional(),
	anotherEnum: z.union([  ]).optional(),}).strict();
