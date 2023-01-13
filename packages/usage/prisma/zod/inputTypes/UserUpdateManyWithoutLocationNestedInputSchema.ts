import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserCreateWithoutLocationInputSchema } from './UserCreateWithoutLocationInputSchema';
import { UserUncheckedCreateWithoutLocationInputSchema } from './UserUncheckedCreateWithoutLocationInputSchema';
import { UserCreateOrConnectWithoutLocationInputSchema } from './UserCreateOrConnectWithoutLocationInputSchema';
import { UserUpsertWithWhereUniqueWithoutLocationInputSchema } from './UserUpsertWithWhereUniqueWithoutLocationInputSchema';
import { UserCreateManyLocationInputEnvelopeSchema } from './UserCreateManyLocationInputEnvelopeSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateWithWhereUniqueWithoutLocationInputSchema } from './UserUpdateWithWhereUniqueWithoutLocationInputSchema';
import { UserUpdateManyWithWhereWithoutLocationInputSchema } from './UserUpdateManyWithWhereWithoutLocationInputSchema';
import { UserScalarWhereInputSchema } from './UserScalarWhereInputSchema';

export const UserUpdateManyWithoutLocationNestedInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateManyWithoutLocationNestedInput> = z.object({
	create: z.union([  ]).optional(),	connectOrCreate: z.union([  ]).optional(),	upsert: z.union([  ]).optional(),	createMany: 	set: z.union([  ]).optional(),	disconnect: z.union([  ]).optional(),	delete: z.union([  ]).optional(),	connect: z.union([  ]).optional(),	update: z.union([  ]).optional(),	updateMany: z.union([  ]).optional(),	deleteMany: z.union([  ]).optional(),}).strict();
