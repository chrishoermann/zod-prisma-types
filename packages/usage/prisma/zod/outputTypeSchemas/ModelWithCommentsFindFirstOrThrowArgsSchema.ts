import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ModelWithCommentsSelectSchema } from '../inputTypeSchemas/ModelWithCommentsSelectSchema'
import { ModelWithCommentsWhereInputSchema } from '../inputTypeSchemas/ModelWithCommentsWhereInputSchema'
import { ModelWithCommentsOrderByWithRelationInputSchema } from '../inputTypeSchemas/ModelWithCommentsOrderByWithRelationInputSchema'
import { ModelWithCommentsWhereUniqueInputSchema } from '../inputTypeSchemas/ModelWithCommentsWhereUniqueInputSchema'
import { ModelWithCommentsScalarFieldEnumSchema } from '../inputTypeSchemas/ModelWithCommentsScalarFieldEnumSchema'

export const ModelWithCommentsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ModelWithCommentsFindFirstOrThrowArgs> = z.object({
  select: ModelWithCommentsSelectSchema.optional(),
  where: ModelWithCommentsWhereInputSchema.optional(),
  orderBy: z.union([ ModelWithCommentsOrderByWithRelationInputSchema.array(),ModelWithCommentsOrderByWithRelationInputSchema ]).optional(),
  cursor: ModelWithCommentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ModelWithCommentsScalarFieldEnumSchema.array().optional(),
}).strict()

export default ModelWithCommentsFindFirstOrThrowArgsSchema
