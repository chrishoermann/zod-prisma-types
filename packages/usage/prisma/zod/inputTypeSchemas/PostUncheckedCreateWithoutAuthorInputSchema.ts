import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { PostCreateanotherEnumInputSchema } from './PostCreateanotherEnumInputSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';

export const PostUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.number().optional(),
  title: z.string(),
  content: z.string().optional().nullable(),
  published: z.boolean().optional(),
  anotherEnum: z.union([ z.lazy(() => PostCreateanotherEnumInputSchema),z.lazy(() => AnotherEnumSchema).array() ]).optional(),
}).strict()

export default PostUncheckedCreateWithoutAuthorInputSchema
