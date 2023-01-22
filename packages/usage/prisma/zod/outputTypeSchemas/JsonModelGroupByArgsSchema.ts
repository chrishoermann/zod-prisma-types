import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { JsonModelSelectSchema } from '../inputTypeSchemas/JsonModelSelectSchema'
import { JsonModelWhereInputSchema } from '../inputTypeSchemas/JsonModelWhereInputSchema'
import { JsonModelOrderByWithAggregationInputSchema } from '../inputTypeSchemas/JsonModelOrderByWithAggregationInputSchema'
import { JsonModelScalarFieldEnumSchema } from '../inputTypeSchemas/JsonModelScalarFieldEnumSchema'
import { JsonModelScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/JsonModelScalarWhereWithAggregatesInputSchema'

export const JsonModelGroupByArgsSchema: z.ZodType<Prisma.JsonModelGroupByArgs> = z.object({
  select: JsonModelSelectSchema.optional(),
  where: JsonModelWhereInputSchema.optional(),
  orderBy: z.union([ JsonModelOrderByWithAggregationInputSchema.array(),JsonModelOrderByWithAggregationInputSchema ]).optional(),
  by: JsonModelScalarFieldEnumSchema.array(),
  having: JsonModelScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default JsonModelGroupByArgsSchema
