import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserCreateWithoutPostsInputSchema } from './UserCreateWithoutPostsInputSchema';
import { UserUncheckedCreateWithoutPostsInputSchema } from './UserUncheckedCreateWithoutPostsInputSchema';
import { UserCreateOrConnectWithoutPostsInputSchema } from './UserCreateOrConnectWithoutPostsInputSchema';
import { UserUpsertWithoutPostsInputSchema } from './UserUpsertWithoutPostsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateWithoutPostsInputSchema } from './UserUpdateWithoutPostsInputSchema';
import { UserUncheckedUpdateWithoutPostsInputSchema } from './UserUncheckedUpdateWithoutPostsInputSchema';

export const UserUpdateOneRequiredWithoutPostsNestedInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateOneRequiredWithoutPostsNestedInput> = z.object({
	create: z.union([  ]).optional(),	connectOrCreate: 	upsert: 	connect: 	update: z.union([  ]).optional(),}).strict();
