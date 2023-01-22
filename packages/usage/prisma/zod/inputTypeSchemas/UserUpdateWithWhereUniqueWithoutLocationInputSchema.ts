import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateWithoutLocationInputSchema } from './UserUpdateWithoutLocationInputSchema';
import { UserUncheckedUpdateWithoutLocationInputSchema } from './UserUncheckedUpdateWithoutLocationInputSchema';

export const UserUpdateWithWhereUniqueWithoutLocationInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutLocationInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutLocationInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLocationInputSchema) ]),
}).strict()

export default UserUpdateWithWhereUniqueWithoutLocationInputSchema
