import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { PostCreateanotherEnumInputSchema } from './PostCreateanotherEnumInputSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';

export const PostUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.PostUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  content: z.string().optional().nullable(),
  published: z.boolean().optional(),
  authorId: z.string(),
  anotherEnum: z.union([ z.lazy(() => PostCreateanotherEnumInputSchema),z.lazy(() => AnotherEnumSchema).array() ]).optional(),
}).strict()