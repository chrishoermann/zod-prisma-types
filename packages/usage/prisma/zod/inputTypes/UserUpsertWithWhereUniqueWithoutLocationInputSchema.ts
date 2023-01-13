import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateWithoutLocationInputSchema } from './UserUpdateWithoutLocationInputSchema';
import { UserUncheckedUpdateWithoutLocationInputSchema } from './UserUncheckedUpdateWithoutLocationInputSchema';
import { UserCreateWithoutLocationInputSchema } from './UserCreateWithoutLocationInputSchema';
import { UserUncheckedCreateWithoutLocationInputSchema } from './UserUncheckedCreateWithoutLocationInputSchema';

export const UserUpsertWithWhereUniqueWithoutLocationInputSchema: z.ZodType<PrismaClient.Prisma.UserUpsertWithWhereUniqueWithoutLocationInput> = z.object({
	where: 	update: z.union([  ]),	create: z.union([  ]),}).strict();
