import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ModelWithCommentsSelectSchema } from '../inputTypeSchemas/ModelWithCommentsSelectSchema'
import { ModelWithCommentsWhereInputSchema } from '../inputTypeSchemas/ModelWithCommentsWhereInputSchema'
import { ModelWithCommentsOrderByWithAggregationInputSchema } from '../inputTypeSchemas/ModelWithCommentsOrderByWithAggregationInputSchema'
import { ModelWithCommentsScalarFieldEnumSchema } from '../inputTypeSchemas/ModelWithCommentsScalarFieldEnumSchema'
import { ModelWithCommentsScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/ModelWithCommentsScalarWhereWithAggregatesInputSchema'

export const ModelWithCommentsGroupByArgsSchema: z.ZodType<Prisma.ModelWithCommentsGroupByArgs> = z.object({
  select: ModelWithCommentsSelectSchema.optional(),
  where: ModelWithCommentsWhereInputSchema.optional(),
  orderBy: z.union([ ModelWithCommentsOrderByWithAggregationInputSchema.array(),ModelWithCommentsOrderByWithAggregationInputSchema ]).optional(),
  by: ModelWithCommentsScalarFieldEnumSchema.array(),
  having: ModelWithCommentsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default ModelWithCommentsGroupByArgsSchema
