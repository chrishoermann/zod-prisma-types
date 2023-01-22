import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { UserCreateWithoutLocationInputSchema } from './UserCreateWithoutLocationInputSchema';
import { UserUncheckedCreateWithoutLocationInputSchema } from './UserUncheckedCreateWithoutLocationInputSchema';
import { UserCreateOrConnectWithoutLocationInputSchema } from './UserCreateOrConnectWithoutLocationInputSchema';
import { UserCreateManyLocationInputEnvelopeSchema } from './UserCreateManyLocationInputEnvelopeSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserUncheckedCreateNestedManyWithoutLocationInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutLocationInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLocationInputSchema),z.lazy(() => UserCreateWithoutLocationInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutLocationInputSchema),z.lazy(() => UserUncheckedCreateWithoutLocationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutLocationInputSchema),z.lazy(() => UserCreateOrConnectWithoutLocationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyLocationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict()

export default UserUncheckedCreateNestedManyWithoutLocationInputSchema
