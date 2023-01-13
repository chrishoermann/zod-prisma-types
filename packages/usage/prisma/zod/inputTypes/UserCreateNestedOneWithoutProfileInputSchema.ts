import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserCreateWithoutProfileInputSchema } from './UserCreateWithoutProfileInputSchema';
import { UserUncheckedCreateWithoutProfileInputSchema } from './UserUncheckedCreateWithoutProfileInputSchema';
import { UserCreateOrConnectWithoutProfileInputSchema } from './UserCreateOrConnectWithoutProfileInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutProfileInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateNestedOneWithoutProfileInput> = z.object({
	create: z.union([  ]).optional(),	connectOrCreate: 	connect: }).strict();
