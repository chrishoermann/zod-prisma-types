import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { UserCreateNestedOneWithoutPostsInputSchema } from './UserCreateNestedOneWithoutPostsInputSchema';
import { PostCreateanotherEnumInputSchema } from './PostCreateanotherEnumInputSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';

export const PostCreateInputSchema: z.ZodType<Prisma.PostCreateInput> = z.object({
  title: z.string(),
  content: z.string().optional().nullable(),
  published: z.boolean().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
  anotherEnum: z.union([ z.lazy(() => PostCreateanotherEnumInputSchema),z.lazy(() => AnotherEnumSchema).array() ]).optional(),
}).strict()

export default PostCreateInputSchema
