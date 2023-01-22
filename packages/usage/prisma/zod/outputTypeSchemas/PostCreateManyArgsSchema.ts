import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { PostCreateManyInputSchema } from '../inputTypeSchemas/PostCreateManyInputSchema'

export const PostCreateManyArgsSchema: z.ZodType<Prisma.PostCreateManyArgs> = z.object({
  data: PostCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default PostCreateManyArgsSchema
