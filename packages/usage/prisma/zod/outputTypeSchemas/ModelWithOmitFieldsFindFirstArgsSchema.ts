import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ModelWithOmitFieldsSelectSchema } from '../inputTypeSchemas/ModelWithOmitFieldsSelectSchema'
import { ModelWithOmitFieldsWhereInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsWhereInputSchema'
import { ModelWithOmitFieldsOrderByWithRelationInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsOrderByWithRelationInputSchema'
import { ModelWithOmitFieldsWhereUniqueInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsWhereUniqueInputSchema'
import { ModelWithOmitFieldsScalarFieldEnumSchema } from '../inputTypeSchemas/ModelWithOmitFieldsScalarFieldEnumSchema'

export const ModelWithOmitFieldsFindFirstArgsSchema: z.ZodType<Prisma.ModelWithOmitFieldsFindFirstArgs> = z.object({
  select: ModelWithOmitFieldsSelectSchema.optional(),
  where: ModelWithOmitFieldsWhereInputSchema.optional(),
  orderBy: z.union([ ModelWithOmitFieldsOrderByWithRelationInputSchema.array(),ModelWithOmitFieldsOrderByWithRelationInputSchema ]).optional(),
  cursor: ModelWithOmitFieldsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ModelWithOmitFieldsScalarFieldEnumSchema.array().optional(),
}).strict()

export default ModelWithOmitFieldsFindFirstArgsSchema
