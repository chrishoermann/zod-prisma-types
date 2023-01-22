import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { WithDefaultValidatorsSelectSchema } from '../inputTypeSchemas/WithDefaultValidatorsSelectSchema'
import { WithDefaultValidatorsWhereInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsWhereInputSchema'
import { WithDefaultValidatorsOrderByWithRelationInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsOrderByWithRelationInputSchema'
import { WithDefaultValidatorsWhereUniqueInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsWhereUniqueInputSchema'
import { WithDefaultValidatorsScalarFieldEnumSchema } from '../inputTypeSchemas/WithDefaultValidatorsScalarFieldEnumSchema'

export const WithDefaultValidatorsFindFirstArgsSchema: z.ZodType<Prisma.WithDefaultValidatorsFindFirstArgs> = z.object({
  select: WithDefaultValidatorsSelectSchema.optional(),
  where: WithDefaultValidatorsWhereInputSchema.optional(),
  orderBy: z.union([ WithDefaultValidatorsOrderByWithRelationInputSchema.array(),WithDefaultValidatorsOrderByWithRelationInputSchema ]).optional(),
  cursor: WithDefaultValidatorsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: WithDefaultValidatorsScalarFieldEnumSchema.array().optional(),
}).strict()

export default WithDefaultValidatorsFindFirstArgsSchema
