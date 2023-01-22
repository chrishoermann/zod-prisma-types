import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { PostCreateanotherEnumInputSchema } from './PostCreateanotherEnumInputSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';

export const PostCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateWithoutAuthorInput> = z.object({
  title: z.string(),
  content: z.string().optional().nullable(),
  published: z.boolean().optional(),
  anotherEnum: z.union([ z.lazy(() => PostCreateanotherEnumInputSchema),z.lazy(() => AnotherEnumSchema).array() ]).optional(),
}).strict()

export default PostCreateWithoutAuthorInputSchema
