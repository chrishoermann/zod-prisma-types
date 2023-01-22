import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { ProfileCreateroleInputSchema } from './ProfileCreateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { SecondEnumSchema } from './SecondEnumSchema';

export const ProfileCreateManyInputSchema: z.ZodType<Prisma.ProfileCreateManyInput> = z.object({
  id: z.number().int().optional(),
  bio: z.string(),
  userId: z.string(),
  role: z.union([ z.lazy(() => ProfileCreateroleInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  second: z.lazy(() => SecondEnumSchema).optional(),
}).strict()

export default ProfileCreateManyInputSchema
