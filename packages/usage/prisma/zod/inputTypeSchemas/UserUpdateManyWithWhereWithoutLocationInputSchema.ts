import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { UserScalarWhereInputSchema } from './UserScalarWhereInputSchema';
import { UserUpdateManyMutationInputSchema } from './UserUpdateManyMutationInputSchema';
import { UserUncheckedUpdateManyWithoutUserInputSchema } from './UserUncheckedUpdateManyWithoutUserInputSchema';

export const UserUpdateManyWithWhereWithoutLocationInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutLocationInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict()

export default UserUpdateManyWithWhereWithoutLocationInputSchema
