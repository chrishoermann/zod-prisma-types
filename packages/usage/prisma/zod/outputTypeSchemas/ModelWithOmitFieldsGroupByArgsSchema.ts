import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ModelWithOmitFieldsSelectSchema } from '../inputTypeSchemas/ModelWithOmitFieldsSelectSchema'
import { ModelWithOmitFieldsWhereInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsWhereInputSchema'
import { ModelWithOmitFieldsOrderByWithAggregationInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsOrderByWithAggregationInputSchema'
import { ModelWithOmitFieldsScalarFieldEnumSchema } from '../inputTypeSchemas/ModelWithOmitFieldsScalarFieldEnumSchema'
import { ModelWithOmitFieldsScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsScalarWhereWithAggregatesInputSchema'

export const ModelWithOmitFieldsGroupByArgsSchema: z.ZodType<Prisma.ModelWithOmitFieldsGroupByArgs> = z.object({
  select: ModelWithOmitFieldsSelectSchema.optional(),
  where: ModelWithOmitFieldsWhereInputSchema.optional(),
  orderBy: z.union([ ModelWithOmitFieldsOrderByWithAggregationInputSchema.array(),ModelWithOmitFieldsOrderByWithAggregationInputSchema ]).optional(),
  by: ModelWithOmitFieldsScalarFieldEnumSchema.array(),
  having: ModelWithOmitFieldsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default ModelWithOmitFieldsGroupByArgsSchema
