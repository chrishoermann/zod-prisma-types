import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { JsonModelSelectSchema } from '../inputTypeSchemas/JsonModelSelectSchema'
import { JsonModelWhereInputSchema } from '../inputTypeSchemas/JsonModelWhereInputSchema'
import { JsonModelOrderByWithRelationInputSchema } from '../inputTypeSchemas/JsonModelOrderByWithRelationInputSchema'
import { JsonModelWhereUniqueInputSchema } from '../inputTypeSchemas/JsonModelWhereUniqueInputSchema'

export const JsonModelAggregateArgsSchema: z.ZodType<Prisma.JsonModelAggregateArgs> = z.object({
  select: JsonModelSelectSchema.optional(),
  where: JsonModelWhereInputSchema.optional(),
  orderBy: z.union([ JsonModelOrderByWithRelationInputSchema.array(),JsonModelOrderByWithRelationInputSchema ]).optional(),
  cursor: JsonModelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default JsonModelAggregateArgsSchema
