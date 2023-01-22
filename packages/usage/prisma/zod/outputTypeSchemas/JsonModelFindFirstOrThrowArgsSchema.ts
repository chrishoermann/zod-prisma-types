import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { JsonModelSelectSchema } from '../inputTypeSchemas/JsonModelSelectSchema'
import { JsonModelWhereInputSchema } from '../inputTypeSchemas/JsonModelWhereInputSchema'
import { JsonModelOrderByWithRelationInputSchema } from '../inputTypeSchemas/JsonModelOrderByWithRelationInputSchema'
import { JsonModelWhereUniqueInputSchema } from '../inputTypeSchemas/JsonModelWhereUniqueInputSchema'
import { JsonModelScalarFieldEnumSchema } from '../inputTypeSchemas/JsonModelScalarFieldEnumSchema'

export const JsonModelFindFirstOrThrowArgsSchema: z.ZodType<Prisma.JsonModelFindFirstOrThrowArgs> = z.object({
  select: JsonModelSelectSchema.optional(),
  where: JsonModelWhereInputSchema.optional(),
  orderBy: z.union([ JsonModelOrderByWithRelationInputSchema.array(),JsonModelOrderByWithRelationInputSchema ]).optional(),
  cursor: JsonModelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: JsonModelScalarFieldEnumSchema.array().optional(),
}).strict()

export default JsonModelFindFirstOrThrowArgsSchema
