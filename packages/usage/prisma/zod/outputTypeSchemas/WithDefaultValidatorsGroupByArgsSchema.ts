import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { WithDefaultValidatorsSelectSchema } from '../inputTypeSchemas/WithDefaultValidatorsSelectSchema'
import { WithDefaultValidatorsWhereInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsWhereInputSchema'
import { WithDefaultValidatorsOrderByWithAggregationInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsOrderByWithAggregationInputSchema'
import { WithDefaultValidatorsScalarFieldEnumSchema } from '../inputTypeSchemas/WithDefaultValidatorsScalarFieldEnumSchema'
import { WithDefaultValidatorsScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsScalarWhereWithAggregatesInputSchema'

export const WithDefaultValidatorsGroupByArgsSchema: z.ZodType<Prisma.WithDefaultValidatorsGroupByArgs> = z.object({
  select: WithDefaultValidatorsSelectSchema.optional(),
  where: WithDefaultValidatorsWhereInputSchema.optional(),
  orderBy: z.union([ WithDefaultValidatorsOrderByWithAggregationInputSchema.array(),WithDefaultValidatorsOrderByWithAggregationInputSchema ]).optional(),
  by: WithDefaultValidatorsScalarFieldEnumSchema.array(),
  having: WithDefaultValidatorsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default WithDefaultValidatorsGroupByArgsSchema
