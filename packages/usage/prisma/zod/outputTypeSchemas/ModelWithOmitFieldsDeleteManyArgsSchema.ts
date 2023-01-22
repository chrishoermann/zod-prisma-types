import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ModelWithOmitFieldsWhereInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsWhereInputSchema'

export const ModelWithOmitFieldsDeleteManyArgsSchema: z.ZodType<Prisma.ModelWithOmitFieldsDeleteManyArgs> = z.object({
  where: ModelWithOmitFieldsWhereInputSchema.optional(),
}).strict()

export default ModelWithOmitFieldsDeleteManyArgsSchema
