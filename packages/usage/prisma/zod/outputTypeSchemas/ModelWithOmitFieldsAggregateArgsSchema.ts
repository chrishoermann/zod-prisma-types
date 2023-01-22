import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ModelWithOmitFieldsSelectSchema } from '../inputTypeSchemas/ModelWithOmitFieldsSelectSchema'
import { ModelWithOmitFieldsWhereInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsWhereInputSchema'
import { ModelWithOmitFieldsOrderByWithRelationInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsOrderByWithRelationInputSchema'
import { ModelWithOmitFieldsWhereUniqueInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsWhereUniqueInputSchema'

export const ModelWithOmitFieldsAggregateArgsSchema: z.ZodType<Prisma.ModelWithOmitFieldsAggregateArgs> = z.object({
  select: ModelWithOmitFieldsSelectSchema.optional(),
  where: ModelWithOmitFieldsWhereInputSchema.optional(),
  orderBy: z.union([ ModelWithOmitFieldsOrderByWithRelationInputSchema.array(),ModelWithOmitFieldsOrderByWithRelationInputSchema ]).optional(),
  cursor: ModelWithOmitFieldsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default ModelWithOmitFieldsAggregateArgsSchema
