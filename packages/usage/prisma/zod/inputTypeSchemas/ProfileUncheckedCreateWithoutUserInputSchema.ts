import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { ProfileCreateroleInputSchema } from './ProfileCreateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { SecondEnumSchema } from './SecondEnumSchema';

export const ProfileUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().optional(),
  bio: z.string(),
  role: z.union([ z.lazy(() => ProfileCreateroleInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  second: z.lazy(() => SecondEnumSchema).optional(),
}).strict()

export default ProfileUncheckedCreateWithoutUserInputSchema
