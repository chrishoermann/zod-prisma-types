import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { PostWhereInputSchema } from '../inputTypeSchemas/PostWhereInputSchema'

export const PostDeleteManyArgsSchema: z.ZodType<Prisma.PostDeleteManyArgs> = z.object({
  where: PostWhereInputSchema.optional(),
}).strict()

export default PostDeleteManyArgsSchema
