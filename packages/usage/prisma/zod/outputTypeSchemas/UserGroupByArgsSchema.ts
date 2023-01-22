import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { UserSelectSchema } from '../inputTypeSchemas/UserSelectSchema'
import { UserIncludeSchema } from '../inputTypeSchemas/UserIncludeSchema'
import { UserWhereInputSchema } from '../inputTypeSchemas/UserWhereInputSchema'
import { UserOrderByWithAggregationInputSchema } from '../inputTypeSchemas/UserOrderByWithAggregationInputSchema'
import { UserScalarFieldEnumSchema } from '../inputTypeSchemas/UserScalarFieldEnumSchema'
import { UserScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/UserScalarWhereWithAggregatesInputSchema'

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default UserGroupByArgsSchema
