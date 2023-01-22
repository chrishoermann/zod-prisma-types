import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ModelWithCommentsSelectSchema } from '../inputTypeSchemas/ModelWithCommentsSelectSchema'
import { ModelWithCommentsWhereInputSchema } from '../inputTypeSchemas/ModelWithCommentsWhereInputSchema'
import { ModelWithCommentsOrderByWithRelationInputSchema } from '../inputTypeSchemas/ModelWithCommentsOrderByWithRelationInputSchema'
import { ModelWithCommentsWhereUniqueInputSchema } from '../inputTypeSchemas/ModelWithCommentsWhereUniqueInputSchema'

export const ModelWithCommentsAggregateArgsSchema: z.ZodType<Prisma.ModelWithCommentsAggregateArgs> = z.object({
  select: ModelWithCommentsSelectSchema.optional(),
  where: ModelWithCommentsWhereInputSchema.optional(),
  orderBy: z.union([ ModelWithCommentsOrderByWithRelationInputSchema.array(),ModelWithCommentsOrderByWithRelationInputSchema ]).optional(),
  cursor: ModelWithCommentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default ModelWithCommentsAggregateArgsSchema
