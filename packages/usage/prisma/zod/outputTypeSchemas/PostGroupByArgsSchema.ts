import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { PostSelectSchema } from '../inputTypeSchemas/PostSelectSchema'
import { PostIncludeSchema } from '../inputTypeSchemas/PostIncludeSchema'
import { PostWhereInputSchema } from '../inputTypeSchemas/PostWhereInputSchema'
import { PostOrderByWithAggregationInputSchema } from '../inputTypeSchemas/PostOrderByWithAggregationInputSchema'
import { PostScalarFieldEnumSchema } from '../inputTypeSchemas/PostScalarFieldEnumSchema'
import { PostScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/PostScalarWhereWithAggregatesInputSchema'

export const PostGroupByArgsSchema: z.ZodType<Prisma.PostGroupByArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithAggregationInputSchema.array(),PostOrderByWithAggregationInputSchema ]).optional(),
  by: PostScalarFieldEnumSchema.array(),
  having: PostScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default PostGroupByArgsSchema
