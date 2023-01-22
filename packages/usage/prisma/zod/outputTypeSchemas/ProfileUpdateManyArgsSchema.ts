import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ProfileUpdateManyMutationInputSchema } from '../inputTypeSchemas/ProfileUpdateManyMutationInputSchema'
import { ProfileUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ProfileUncheckedUpdateManyInputSchema'
import { ProfileWhereInputSchema } from '../inputTypeSchemas/ProfileWhereInputSchema'

export const ProfileUpdateManyArgsSchema: z.ZodType<Prisma.ProfileUpdateManyArgs> = z.object({
  data: z.union([ ProfileUpdateManyMutationInputSchema,ProfileUncheckedUpdateManyInputSchema ]),
  where: ProfileWhereInputSchema.optional(),
}).strict()

export default ProfileUpdateManyArgsSchema
