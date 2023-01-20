import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { RoleSchema } from './RoleSchema';

export const ProfileUpdateroleInputSchema: z.ZodType<Prisma.ProfileUpdateroleInput> = z.object({
  set: z.lazy(() => RoleSchema).array().optional(),
  push: z.union([ z.lazy(() => RoleSchema),z.lazy(() => RoleSchema).array() ]).optional(),
}).strict()

export default ProfileUpdateroleInputSchema
