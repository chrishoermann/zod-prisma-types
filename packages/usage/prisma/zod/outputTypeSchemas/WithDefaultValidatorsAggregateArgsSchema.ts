import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { WithDefaultValidatorsSelectSchema } from '../inputTypeSchemas/WithDefaultValidatorsSelectSchema'
import { WithDefaultValidatorsWhereInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsWhereInputSchema'
import { WithDefaultValidatorsOrderByWithRelationInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsOrderByWithRelationInputSchema'
import { WithDefaultValidatorsWhereUniqueInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsWhereUniqueInputSchema'

export const WithDefaultValidatorsAggregateArgsSchema: z.ZodType<Prisma.WithDefaultValidatorsAggregateArgs> = z.object({
  select: WithDefaultValidatorsSelectSchema.optional(),
  where: WithDefaultValidatorsWhereInputSchema.optional(),
  orderBy: z.union([ WithDefaultValidatorsOrderByWithRelationInputSchema.array(),WithDefaultValidatorsOrderByWithRelationInputSchema ]).optional(),
  cursor: WithDefaultValidatorsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default WithDefaultValidatorsAggregateArgsSchema
