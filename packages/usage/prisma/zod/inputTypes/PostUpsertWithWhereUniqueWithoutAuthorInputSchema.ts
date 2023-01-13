import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { PostWhereUniqueInputSchema } from './PostWhereUniqueInputSchema';
import { PostUpdateWithoutAuthorInputSchema } from './PostUpdateWithoutAuthorInputSchema';
import { PostUncheckedUpdateWithoutAuthorInputSchema } from './PostUncheckedUpdateWithoutAuthorInputSchema';
import { PostCreateWithoutAuthorInputSchema } from './PostCreateWithoutAuthorInputSchema';
import { PostUncheckedCreateWithoutAuthorInputSchema } from './PostUncheckedCreateWithoutAuthorInputSchema';

export const PostUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<PrismaClient.Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
	where: 	update: z.union([  ]),	create: z.union([  ]),}).strict();