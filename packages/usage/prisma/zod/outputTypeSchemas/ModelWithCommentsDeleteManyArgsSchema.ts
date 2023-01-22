import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ModelWithCommentsWhereInputSchema } from '../inputTypeSchemas/ModelWithCommentsWhereInputSchema'

export const ModelWithCommentsDeleteManyArgsSchema: z.ZodType<Prisma.ModelWithCommentsDeleteManyArgs> = z.object({
  where: ModelWithCommentsWhereInputSchema.optional(),
}).strict()

export default ModelWithCommentsDeleteManyArgsSchema
