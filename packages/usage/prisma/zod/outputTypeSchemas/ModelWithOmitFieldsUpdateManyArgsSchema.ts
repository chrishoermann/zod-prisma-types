import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ModelWithOmitFieldsUpdateManyMutationInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsUpdateManyMutationInputSchema'
import { ModelWithOmitFieldsUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsUncheckedUpdateManyInputSchema'
import { ModelWithOmitFieldsWhereInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsWhereInputSchema'

export const ModelWithOmitFieldsUpdateManyArgsSchema: z.ZodType<Omit<Prisma.ModelWithOmitFieldsUpdateManyArgs, "data"> & { where?: z.infer<typeof ModelWithOmitFieldsWhereInputSchema>  }> = z.object({
  data: z.union([ ModelWithOmitFieldsUpdateManyMutationInputSchema,ModelWithOmitFieldsUncheckedUpdateManyInputSchema ]),
  where: ModelWithOmitFieldsWhereInputSchema.optional(),
}).strict()

export default ModelWithOmitFieldsUpdateManyArgsSchema
