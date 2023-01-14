import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { PostScalarWhereInputSchema } from './PostScalarWhereInputSchema';
import { PostUpdateManyMutationInputSchema } from './PostUpdateManyMutationInputSchema';
import { PostUncheckedUpdateManyWithoutPostsInputSchema } from './PostUncheckedUpdateManyWithoutPostsInputSchema';

export const PostUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<PrismaClient.Prisma.PostUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PostUpdateManyMutationInputSchema),z.lazy(() => PostUncheckedUpdateManyWithoutPostsInputSchema) ]),
}).strict()