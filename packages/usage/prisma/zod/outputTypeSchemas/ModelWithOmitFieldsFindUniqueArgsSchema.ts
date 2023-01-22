import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ModelWithOmitFieldsSelectSchema } from '../inputTypeSchemas/ModelWithOmitFieldsSelectSchema'
import { ModelWithOmitFieldsWhereUniqueInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsWhereUniqueInputSchema'

export const ModelWithOmitFieldsFindUniqueArgsSchema: z.ZodType<Prisma.ModelWithOmitFieldsFindUniqueArgs> = z.object({
  select: ModelWithOmitFieldsSelectSchema.optional(),
  where: ModelWithOmitFieldsWhereUniqueInputSchema,
}).strict()

export default ModelWithOmitFieldsFindUniqueArgsSchema
