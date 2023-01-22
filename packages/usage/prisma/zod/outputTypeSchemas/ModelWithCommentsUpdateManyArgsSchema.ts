import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ModelWithCommentsUpdateManyMutationInputSchema } from '../inputTypeSchemas/ModelWithCommentsUpdateManyMutationInputSchema'
import { ModelWithCommentsUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ModelWithCommentsUncheckedUpdateManyInputSchema'
import { ModelWithCommentsWhereInputSchema } from '../inputTypeSchemas/ModelWithCommentsWhereInputSchema'

export const ModelWithCommentsUpdateManyArgsSchema: z.ZodType<Omit<Prisma.ModelWithCommentsUpdateManyArgs, "data"> & { where?: z.infer<typeof ModelWithCommentsWhereInputSchema>  }> = z.object({
  data: z.union([ ModelWithCommentsUpdateManyMutationInputSchema,ModelWithCommentsUncheckedUpdateManyInputSchema ]),
  where: ModelWithCommentsWhereInputSchema.optional(),
}).strict()

export default ModelWithCommentsUpdateManyArgsSchema
