import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ModelWithCommentsSelectSchema } from '../inputTypeSchemas/ModelWithCommentsSelectSchema'
import { ModelWithCommentsWhereUniqueInputSchema } from '../inputTypeSchemas/ModelWithCommentsWhereUniqueInputSchema'

export const ModelWithCommentsDeleteArgsSchema: z.ZodType<Prisma.ModelWithCommentsDeleteArgs> = z.object({
  select: ModelWithCommentsSelectSchema.optional(),
  where: ModelWithCommentsWhereUniqueInputSchema,
}).strict()

export default ModelWithCommentsDeleteArgsSchema
