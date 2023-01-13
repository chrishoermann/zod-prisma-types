import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserCreateWithoutProfileInputSchema } from './UserCreateWithoutProfileInputSchema';
import { UserUncheckedCreateWithoutProfileInputSchema } from './UserUncheckedCreateWithoutProfileInputSchema';
import { UserCreateOrConnectWithoutProfileInputSchema } from './UserCreateOrConnectWithoutProfileInputSchema';
import { UserUpsertWithoutProfileInputSchema } from './UserUpsertWithoutProfileInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateWithoutProfileInputSchema } from './UserUpdateWithoutProfileInputSchema';
import { UserUncheckedUpdateWithoutProfileInputSchema } from './UserUncheckedUpdateWithoutProfileInputSchema';

export const UserUpdateOneRequiredWithoutProfileNestedInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateOneRequiredWithoutProfileNestedInput> = z.object({
	create: z.union([  ]).optional(),	connectOrCreate: 	upsert: 	connect: 	update: z.union([  ]).optional(),}).strict();
