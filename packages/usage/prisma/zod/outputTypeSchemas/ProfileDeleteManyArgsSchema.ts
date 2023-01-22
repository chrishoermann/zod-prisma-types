import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ProfileWhereInputSchema } from '../inputTypeSchemas/ProfileWhereInputSchema'

export const ProfileDeleteManyArgsSchema: z.ZodType<Prisma.ProfileDeleteManyArgs> = z.object({
  where: ProfileWhereInputSchema.optional(),
}).strict()

export default ProfileDeleteManyArgsSchema
