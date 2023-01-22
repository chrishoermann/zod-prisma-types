import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ModelWithCommentsCreateManyInputSchema } from '../inputTypeSchemas/ModelWithCommentsCreateManyInputSchema'

export const ModelWithCommentsCreateManyArgsSchema: z.ZodType<Omit<Prisma.ModelWithCommentsCreateManyArgs, "data"> & { skipDuplicates?: z.infer<typeof BooleanSchema>  }> = z.object({
  data: ModelWithCommentsCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default ModelWithCommentsCreateManyArgsSchema
