import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ModelWithOmitFieldsSelectSchema } from '../inputTypeSchemas/ModelWithOmitFieldsSelectSchema'
import { ModelWithOmitFieldsWhereUniqueInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsWhereUniqueInputSchema'
import { ModelWithOmitFieldsCreateInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsCreateInputSchema'
import { ModelWithOmitFieldsUncheckedCreateInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsUncheckedCreateInputSchema'
import { ModelWithOmitFieldsUpdateInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsUpdateInputSchema'
import { ModelWithOmitFieldsUncheckedUpdateInputSchema } from '../inputTypeSchemas/ModelWithOmitFieldsUncheckedUpdateInputSchema'

export const ModelWithOmitFieldsUpsertArgsSchema: z.ZodType<Omit<Prisma.ModelWithOmitFieldsUpsertArgs, "create" | "update"> & { where: z.infer<typeof ModelWithOmitFieldsWhereUniqueInputSchema> , }> = z.object({
  select: ModelWithOmitFieldsSelectSchema.optional(),
  where: ModelWithOmitFieldsWhereUniqueInputSchema,
  create: z.union([ ModelWithOmitFieldsCreateInputSchema,ModelWithOmitFieldsUncheckedCreateInputSchema ]),
  update: z.union([ ModelWithOmitFieldsUpdateInputSchema,ModelWithOmitFieldsUncheckedUpdateInputSchema ]),
}).strict()

export default ModelWithOmitFieldsUpsertArgsSchema
