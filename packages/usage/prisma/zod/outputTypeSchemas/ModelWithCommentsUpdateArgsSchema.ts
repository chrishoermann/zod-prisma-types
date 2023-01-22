import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ModelWithCommentsSelectSchema } from '../inputTypeSchemas/ModelWithCommentsSelectSchema'
import { ModelWithCommentsUpdateInputSchema } from '../inputTypeSchemas/ModelWithCommentsUpdateInputSchema'
import { ModelWithCommentsUncheckedUpdateInputSchema } from '../inputTypeSchemas/ModelWithCommentsUncheckedUpdateInputSchema'
import { ModelWithCommentsWhereUniqueInputSchema } from '../inputTypeSchemas/ModelWithCommentsWhereUniqueInputSchema'

export const ModelWithCommentsUpdateArgsSchema: z.ZodType<Omit<Prisma.ModelWithCommentsUpdateArgs, "data"> & { where: z.infer<typeof ModelWithCommentsWhereUniqueInputSchema>  }> = z.object({
  select: ModelWithCommentsSelectSchema.optional(),
  data: z.union([ ModelWithCommentsUpdateInputSchema,ModelWithCommentsUncheckedUpdateInputSchema ]),
  where: ModelWithCommentsWhereUniqueInputSchema,
}).strict()

export default ModelWithCommentsUpdateArgsSchema
