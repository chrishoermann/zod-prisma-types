import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { PostCreateWithoutAuthorInputSchema } from './PostCreateWithoutAuthorInputSchema';
import { PostUncheckedCreateWithoutAuthorInputSchema } from './PostUncheckedCreateWithoutAuthorInputSchema';
import { PostCreateOrConnectWithoutAuthorInputSchema } from './PostCreateOrConnectWithoutAuthorInputSchema';
import { PostCreateManyAuthorInputEnvelopeSchema } from './PostCreateManyAuthorInputEnvelopeSchema';
import { PostWhereUniqueInputSchema } from './PostWhereUniqueInputSchema';

export const PostCreateNestedManyWithoutAuthorInputSchema: z.ZodType<PrismaClient.Prisma.PostCreateNestedManyWithoutAuthorInput> = z.object({
	create: z.union([  ]).optional(),	connectOrCreate: z.union([  ]).optional(),	createMany: 	connect: z.union([  ]).optional(),}).strict();
