import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserCreateWithoutPostsInputSchema } from './UserCreateWithoutPostsInputSchema';
import { UserUncheckedCreateWithoutPostsInputSchema } from './UserUncheckedCreateWithoutPostsInputSchema';
import { UserCreateOrConnectWithoutPostsInputSchema } from './UserCreateOrConnectWithoutPostsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutPostsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateNestedOneWithoutPostsInput> = z.object({
	create: z.union([  ]).optional(),	connectOrCreate: 	connect: }).strict();
