import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { PostCreateWithoutAuthorInputSchema } from './PostCreateWithoutAuthorInputSchema';
import { PostUncheckedCreateWithoutAuthorInputSchema } from './PostUncheckedCreateWithoutAuthorInputSchema';
import { PostCreateOrConnectWithoutAuthorInputSchema } from './PostCreateOrConnectWithoutAuthorInputSchema';
import { PostCreateManyAuthorInputEnvelopeSchema } from './PostCreateManyAuthorInputEnvelopeSchema';
import { PostWhereUniqueInputSchema } from './PostWhereUniqueInputSchema';

export const PostUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<PrismaClient.Prisma.PostUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
	create: z.union([  ]).optional(),	connectOrCreate: z.union([  ]).optional(),	createMany: 	connect: z.union([  ]).optional(),}).strict();
