import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { PostSelectSchema } from '../inputTypeSchemas/PostSelectSchema'
import { PostIncludeSchema } from '../inputTypeSchemas/PostIncludeSchema'
import { PostWhereInputSchema } from '../inputTypeSchemas/PostWhereInputSchema'
import { PostOrderByWithRelationInputSchema } from '../inputTypeSchemas/PostOrderByWithRelationInputSchema'
import { PostWhereUniqueInputSchema } from '../inputTypeSchemas/PostWhereUniqueInputSchema'

export const PostAggregateArgsSchema: z.ZodType<Prisma.PostAggregateArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default PostAggregateArgsSchema
