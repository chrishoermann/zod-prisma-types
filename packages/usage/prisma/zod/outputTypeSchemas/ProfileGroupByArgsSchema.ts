import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ProfileSelectSchema } from '../inputTypeSchemas/ProfileSelectSchema'
import { ProfileIncludeSchema } from '../inputTypeSchemas/ProfileIncludeSchema'
import { ProfileWhereInputSchema } from '../inputTypeSchemas/ProfileWhereInputSchema'
import { ProfileOrderByWithAggregationInputSchema } from '../inputTypeSchemas/ProfileOrderByWithAggregationInputSchema'
import { ProfileScalarFieldEnumSchema } from '../inputTypeSchemas/ProfileScalarFieldEnumSchema'
import { ProfileScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/ProfileScalarWhereWithAggregatesInputSchema'

export const ProfileGroupByArgsSchema: z.ZodType<Prisma.ProfileGroupByArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ ProfileOrderByWithAggregationInputSchema.array(),ProfileOrderByWithAggregationInputSchema ]).optional(),
  by: ProfileScalarFieldEnumSchema.array(),
  having: ProfileScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default ProfileGroupByArgsSchema
