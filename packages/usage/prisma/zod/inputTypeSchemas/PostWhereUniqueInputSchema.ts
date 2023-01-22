import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const PostWhereUniqueInputSchema: z.ZodType<Prisma.PostWhereUniqueInput> = z.object({
  id: z.number().optional(),
}).strict()

export default PostWhereUniqueInputSchema
