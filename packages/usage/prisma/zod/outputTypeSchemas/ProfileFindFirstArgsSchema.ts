import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ProfileSelectSchema } from '../inputTypeSchemas/ProfileSelectSchema'
import { ProfileIncludeSchema } from '../inputTypeSchemas/ProfileIncludeSchema'
import { ProfileWhereInputSchema } from '../inputTypeSchemas/ProfileWhereInputSchema'
import { ProfileOrderByWithRelationInputSchema } from '../inputTypeSchemas/ProfileOrderByWithRelationInputSchema'
import { ProfileWhereUniqueInputSchema } from '../inputTypeSchemas/ProfileWhereUniqueInputSchema'
import { ProfileScalarFieldEnumSchema } from '../inputTypeSchemas/ProfileScalarFieldEnumSchema'

export const ProfileFindFirstArgsSchema: z.ZodType<Prisma.ProfileFindFirstArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ ProfileOrderByWithRelationInputSchema.array(),ProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ProfileScalarFieldEnumSchema.array().optional(),
}).strict()

export default ProfileFindFirstArgsSchema
