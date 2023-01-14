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
  create: z.union([ z.lazy(() => UserCreateWithoutLocationInputSchema),z.lazy(() => UserCreateWithoutLocationInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutLocationInputSchema),z.lazy(() => UserUncheckedCreateWithoutLocationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutLocationInputSchema),z.lazy(() => UserCreateOrConnectWithoutLocationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutLocationInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutLocationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyLocationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutLocationInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutLocationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutLocationInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutLocationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict()