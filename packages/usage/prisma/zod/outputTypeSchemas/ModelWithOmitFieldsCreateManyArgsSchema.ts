import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ModelWithOmitFieldsCreateManyInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsCreateManyInputSchema'

export const ModelWithOmitFieldsCreateManyArgsSchema: z.ZodType<Omit<Prisma.ModelWithOmitFieldsCreateManyArgs, "data"> & { skipDuplicates?: z.infer<typeof BooleanSchema>  }> = z.object({
  data: ModelWithOmitFieldsCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default ModelWithOmitFieldsCreateManyArgsSchema
