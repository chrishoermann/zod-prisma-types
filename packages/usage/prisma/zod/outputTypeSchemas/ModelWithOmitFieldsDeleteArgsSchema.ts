import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ModelWithOmitFieldsSelectSchema } from '../inputTypeSchemas/ModelWithOmitFieldsSelectSchema'
import { ModelWithOmitFieldsWhereUniqueInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsWhereUniqueInputSchema'

export const ModelWithOmitFieldsDeleteArgsSchema: z.ZodType<Prisma.ModelWithOmitFieldsDeleteArgs> = z.object({
  select: ModelWithOmitFieldsSelectSchema.optional(),
  where: ModelWithOmitFieldsWhereUniqueInputSchema,
}).strict()

export default ModelWithOmitFieldsDeleteArgsSchema
