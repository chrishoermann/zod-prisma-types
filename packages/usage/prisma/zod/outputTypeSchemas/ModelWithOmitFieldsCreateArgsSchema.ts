import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ModelWithOmitFieldsSelectSchema } from '../inputTypeSchemas/ModelWithOmitFieldsSelectSchema'
import { ModelWithOmitFieldsCreateInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsCreateInputSchema'
import { ModelWithOmitFieldsUncheckedCreateInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsUncheckedCreateInputSchema'

export const ModelWithOmitFieldsCreateArgsSchema: z.ZodType<Omit<Prisma.ModelWithOmitFieldsCreateArgs, "data"> & {  }> = z.object({
  select: ModelWithOmitFieldsSelectSchema.optional(),
  data: z.union([ ModelWithOmitFieldsCreateInputSchema,ModelWithOmitFieldsUncheckedCreateInputSchema ]),
}).strict()

export default ModelWithOmitFieldsCreateArgsSchema
