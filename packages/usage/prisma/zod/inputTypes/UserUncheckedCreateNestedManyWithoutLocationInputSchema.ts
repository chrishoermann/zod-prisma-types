import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserCreateWithoutLocationInputSchema } from './UserCreateWithoutLocationInputSchema';
import { UserUncheckedCreateWithoutLocationInputSchema } from './UserUncheckedCreateWithoutLocationInputSchema';
import { UserCreateOrConnectWithoutLocationInputSchema } from './UserCreateOrConnectWithoutLocationInputSchema';
import { UserCreateManyLocationInputEnvelopeSchema } from './UserCreateManyLocationInputEnvelopeSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserUncheckedCreateNestedManyWithoutLocationInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateNestedManyWithoutLocationInput> = z.object({
	create: z.union([  ]).optional(),	connectOrCreate: z.union([  ]).optional(),	createMany: 	connect: z.union([  ]).optional(),}).strict();
