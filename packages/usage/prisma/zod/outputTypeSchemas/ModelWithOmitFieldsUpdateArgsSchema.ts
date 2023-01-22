import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ModelWithOmitFieldsSelectSchema } from '../inputTypeSchemas/ModelWithOmitFieldsSelectSchema'
import { ModelWithOmitFieldsUpdateInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsUpdateInputSchema'
import { ModelWithOmitFieldsUncheckedUpdateInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsUncheckedUpdateInputSchema'
import { ModelWithOmitFieldsWhereUniqueInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsWhereUniqueInputSchema'

export const ModelWithOmitFieldsUpdateArgsSchema: z.ZodType<Omit<Prisma.ModelWithOmitFieldsUpdateArgs, "data"> & { where: z.infer<typeof ModelWithOmitFieldsWhereUniqueInputSchema>  }> = z.object({
  select: ModelWithOmitFieldsSelectSchema.optional(),
  data: z.union([ ModelWithOmitFieldsUpdateInputSchema,ModelWithOmitFieldsUncheckedUpdateInputSchema ]),
  where: ModelWithOmitFieldsWhereUniqueInputSchema,
}).strict()

export default ModelWithOmitFieldsUpdateArgsSchema
