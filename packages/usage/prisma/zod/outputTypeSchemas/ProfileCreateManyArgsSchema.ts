import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ProfileCreateManyInputSchema } from '../inputTypeSchemas/ProfileCreateManyInputSchema'

export const ProfileCreateManyArgsSchema: z.ZodType<Prisma.ProfileCreateManyArgs> = z.object({
  data: ProfileCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default ProfileCreateManyArgsSchema
