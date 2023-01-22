import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { PostSelectSchema } from '../inputTypeSchemas/PostSelectSchema'
import { PostIncludeSchema } from '../inputTypeSchemas/PostIncludeSchema'
import { PostWhereUniqueInputSchema } from '../inputTypeSchemas/PostWhereUniqueInputSchema'

export const PostDeleteArgsSchema: z.ZodType<Prisma.PostDeleteArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict()

export default PostDeleteArgsSchema
