import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { PostWhereUniqueInputSchema } from './PostWhereUniqueInputSchema';
import { PostCreateWithoutAuthorInputSchema } from './PostCreateWithoutAuthorInputSchema';
import { PostUncheckedCreateWithoutAuthorInputSchema } from './PostUncheckedCreateWithoutAuthorInputSchema';

export const PostCreateOrConnectWithoutAuthorInputSchema: z.ZodType<PrismaClient.Prisma.PostCreateOrConnectWithoutAuthorInput> = z.object({
	where: 	create: z.union([  ]),}).strict();
