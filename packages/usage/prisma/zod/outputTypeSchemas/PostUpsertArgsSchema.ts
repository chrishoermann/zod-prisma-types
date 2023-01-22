import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { PostSelectSchema } from '../inputTypeSchemas/PostSelectSchema'
import { PostIncludeSchema } from '../inputTypeSchemas/PostIncludeSchema'
import { PostWhereUniqueInputSchema } from '../inputTypeSchemas/PostWhereUniqueInputSchema'
import { PostCreateInputSchema } from '../inputTypeSchemas/PostCreateInputSchema'
import { PostUncheckedCreateInputSchema } from '../inputTypeSchemas/PostUncheckedCreateInputSchema'
import { PostUpdateInputSchema } from '../inputTypeSchemas/PostUpdateInputSchema'
import { PostUncheckedUpdateInputSchema } from '../inputTypeSchemas/PostUncheckedUpdateInputSchema'

export const PostUpsertArgsSchema: z.ZodType<Prisma.PostUpsertArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
  create: z.union([ PostCreateInputSchema,PostUncheckedCreateInputSchema ]),
  update: z.union([ PostUpdateInputSchema,PostUncheckedUpdateInputSchema ]),
}).strict()

export default PostUpsertArgsSchema
