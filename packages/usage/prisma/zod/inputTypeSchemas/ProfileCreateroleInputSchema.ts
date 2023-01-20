import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { RoleSchema } from './RoleSchema';

export const ProfileCreateroleInputSchema: z.ZodType<Prisma.ProfileCreateroleInput> = z.object({
  set: z.lazy(() => RoleSchema).array(),
}).strict()

export default ProfileCreateroleInputSchema
