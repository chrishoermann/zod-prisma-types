import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { PostUpdateManyMutationInputSchema } from '../inputTypeSchemas/PostUpdateManyMutationInputSchema'
import { PostUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/PostUncheckedUpdateManyInputSchema'
import { PostWhereInputSchema } from '../inputTypeSchemas/PostWhereInputSchema'

export const PostUpdateManyArgsSchema: z.ZodType<Prisma.PostUpdateManyArgs> = z.object({
  data: z.union([ PostUpdateManyMutationInputSchema,PostUncheckedUpdateManyInputSchema ]),
  where: PostWhereInputSchema.optional(),
}).strict()

export default PostUpdateManyArgsSchema
