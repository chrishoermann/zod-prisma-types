import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ModelWithCommentsSelectSchema } from '../inputTypeSchemas/ModelWithCommentsSelectSchema'
import { ModelWithCommentsCreateInputSchema } from '../inputTypeSchemas/ModelWithCommentsCreateInputSchema'
import { ModelWithCommentsUncheckedCreateInputSchema } from '../inputTypeSchemas/ModelWithCommentsUncheckedCreateInputSchema'

export const ModelWithCommentsCreateArgsSchema: z.ZodType<Omit<Prisma.ModelWithCommentsCreateArgs, "data"> & {  }> = z.object({
  select: ModelWithCommentsSelectSchema.optional(),
  data: z.union([ ModelWithCommentsCreateInputSchema,ModelWithCommentsUncheckedCreateInputSchema ]),
}).strict()

export default ModelWithCommentsCreateArgsSchema
