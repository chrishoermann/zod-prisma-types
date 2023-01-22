import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { PostWhereUniqueInputSchema } from './PostWhereUniqueInputSchema';
import { PostUpdateWithoutAuthorInputSchema } from './PostUpdateWithoutAuthorInputSchema';
import { PostUncheckedUpdateWithoutAuthorInputSchema } from './PostUncheckedUpdateWithoutAuthorInputSchema';

export const PostUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PostUpdateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict()

export default PostUpdateWithWhereUniqueWithoutAuthorInputSchema
