import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { PostWhereUniqueInputSchema } from './PostWhereUniqueInputSchema';
import { PostUpdateWithoutAuthorInputSchema } from './PostUpdateWithoutAuthorInputSchema';
import { PostUncheckedUpdateWithoutAuthorInputSchema } from './PostUncheckedUpdateWithoutAuthorInputSchema';

export const PostUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<PrismaClient.Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
	where: 	data: z.union([  ]),}).strict();
