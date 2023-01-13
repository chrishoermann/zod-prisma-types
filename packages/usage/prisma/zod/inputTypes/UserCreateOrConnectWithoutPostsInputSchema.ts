import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutPostsInputSchema } from './UserCreateWithoutPostsInputSchema';
import { UserUncheckedCreateWithoutPostsInputSchema } from './UserUncheckedCreateWithoutPostsInputSchema';

export const UserCreateOrConnectWithoutPostsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateOrConnectWithoutPostsInput> = z.object({
	where: 	create: z.union([  ]),}).strict();
