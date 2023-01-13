import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserUpdateWithoutPostsInputSchema } from './UserUpdateWithoutPostsInputSchema';
import { UserUncheckedUpdateWithoutPostsInputSchema } from './UserUncheckedUpdateWithoutPostsInputSchema';
import { UserCreateWithoutPostsInputSchema } from './UserCreateWithoutPostsInputSchema';
import { UserUncheckedCreateWithoutPostsInputSchema } from './UserUncheckedCreateWithoutPostsInputSchema';

export const UserUpsertWithoutPostsInputSchema: z.ZodType<PrismaClient.Prisma.UserUpsertWithoutPostsInput> = z.object({
	update: z.union([  ]),	create: z.union([  ]),}).strict();
