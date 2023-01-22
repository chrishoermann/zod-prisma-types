import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { PostSelectSchema } from '../inputTypeSchemas/PostSelectSchema'
import { PostIncludeSchema } from '../inputTypeSchemas/PostIncludeSchema'

export const PostArgsSchema: z.ZodType<Prisma.PostArgs> = z.object({
  select: z.lazy(() => PostSelectSchema).optional(),
  include: z.lazy(() => PostIncludeSchema).optional(),
}).strict()

export default PostSelectSchema
