import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { NonDefaultModelSelectSchema } from '../inputTypeSchemas/NonDefaultModelSelectSchema'
import { NonDefaultModelWhereInputSchema } from '../inputTypeSchemas/NonDefaultModelWhereInputSchema'
import { NonDefaultModelOrderByWithAggregationInputSchema } from '../inputTypeSchemas/NonDefaultModelOrderByWithAggregationInputSchema'
import { NonDefaultModelScalarFieldEnumSchema } from '../inputTypeSchemas/NonDefaultModelScalarFieldEnumSchema'
import { NonDefaultModelScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/NonDefaultModelScalarWhereWithAggregatesInputSchema'

export const NonDefaultModelGroupByArgsSchema: z.ZodType<Prisma.NonDefaultModelGroupByArgs> = z.object({
  select: NonDefaultModelSelectSchema.optional(),
  where: NonDefaultModelWhereInputSchema.optional(),
  orderBy: z.union([ NonDefaultModelOrderByWithAggregationInputSchema.array(),NonDefaultModelOrderByWithAggregationInputSchema ]).optional(),
  by: NonDefaultModelScalarFieldEnumSchema.array(),
  having: NonDefaultModelScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default NonDefaultModelGroupByArgsSchema
