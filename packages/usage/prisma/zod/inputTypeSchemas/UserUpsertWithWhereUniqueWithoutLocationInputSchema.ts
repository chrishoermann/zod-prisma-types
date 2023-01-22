import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateWithoutLocationInputSchema } from './UserUpdateWithoutLocationInputSchema';
import { UserUncheckedUpdateWithoutLocationInputSchema } from './UserUncheckedUpdateWithoutLocationInputSchema';
import { UserCreateWithoutLocationInputSchema } from './UserCreateWithoutLocationInputSchema';
import { UserUncheckedCreateWithoutLocationInputSchema } from './UserUncheckedCreateWithoutLocationInputSchema';

export const UserUpsertWithWhereUniqueWithoutLocationInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutLocationInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutLocationInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLocationInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutLocationInputSchema),z.lazy(() => UserUncheckedCreateWithoutLocationInputSchema) ]),
}).strict()

export default UserUpsertWithWhereUniqueWithoutLocationInputSchema
