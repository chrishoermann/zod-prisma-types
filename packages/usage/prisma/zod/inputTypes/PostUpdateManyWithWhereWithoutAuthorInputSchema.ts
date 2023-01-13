import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { PostScalarWhereInputSchema } from './PostScalarWhereInputSchema';
import { PostUpdateManyMutationInputSchema } from './PostUpdateManyMutationInputSchema';
import { PostUncheckedUpdateManyWithoutPostsInputSchema } from './PostUncheckedUpdateManyWithoutPostsInputSchema';

export const PostUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<PrismaClient.Prisma.PostUpdateManyWithWhereWithoutAuthorInput> = z.object({
	where: 	data: z.union([  ]),}).strict();
