import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ModelWithCommentsSelectSchema } from '../inputTypeSchemas/ModelWithCommentsSelectSchema'
import { ModelWithCommentsWhereUniqueInputSchema } from '../inputTypeSchemas/ModelWithCommentsWhereUniqueInputSchema'

export const ModelWithCommentsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ModelWithCommentsFindUniqueOrThrowArgs> = z.object({
  select: ModelWithCommentsSelectSchema.optional(),
  where: ModelWithCommentsWhereUniqueInputSchema,
}).strict()

export default ModelWithCommentsFindUniqueOrThrowArgsSchema
