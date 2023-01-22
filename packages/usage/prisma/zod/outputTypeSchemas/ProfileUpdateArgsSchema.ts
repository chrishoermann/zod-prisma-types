import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ProfileSelectSchema } from '../inputTypeSchemas/ProfileSelectSchema'
import { ProfileIncludeSchema } from '../inputTypeSchemas/ProfileIncludeSchema'
import { ProfileUpdateInputSchema } from '../inputTypeSchemas/ProfileUpdateInputSchema'
import { ProfileUncheckedUpdateInputSchema } from '../inputTypeSchemas/ProfileUncheckedUpdateInputSchema'
import { ProfileWhereUniqueInputSchema } from '../inputTypeSchemas/ProfileWhereUniqueInputSchema'

export const ProfileUpdateArgsSchema: z.ZodType<Prisma.ProfileUpdateArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  data: z.union([ ProfileUpdateInputSchema,ProfileUncheckedUpdateInputSchema ]),
  where: ProfileWhereUniqueInputSchema,
}).strict()

export default ProfileUpdateArgsSchema
