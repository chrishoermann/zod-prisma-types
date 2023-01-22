import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ModelWithCommentsSelectSchema } from '../inputTypeSchemas/ModelWithCommentsSelectSchema'
import { ModelWithCommentsWhereUniqueInputSchema } from '../inputTypeSchemas/ModelWithCommentsWhereUniqueInputSchema'
import { ModelWithCommentsCreateInputSchema } from '../inputTypeSchemas/ModelWithCommentsCreateInputSchema'
import { ModelWithCommentsUncheckedCreateInputSchema } from '../inputTypeSchemas/ModelWithCommentsUncheckedCreateInputSchema'
import { ModelWithCommentsUpdateInputSchema } from '../inputTypeSchemas/ModelWithCommentsUpdateInputSchema'
import { ModelWithCommentsUncheckedUpdateInputSchema } from '../inputTypeSchemas/ModelWithCommentsUncheckedUpdateInputSchema'

export const ModelWithCommentsUpsertArgsSchema: z.ZodType<Omit<Prisma.ModelWithCommentsUpsertArgs, "create" | "update"> & { where: z.infer<typeof ModelWithCommentsWhereUniqueInputSchema> , }> = z.object({
  select: ModelWithCommentsSelectSchema.optional(),
  where: ModelWithCommentsWhereUniqueInputSchema,
  create: z.union([ ModelWithCommentsCreateInputSchema,ModelWithCommentsUncheckedCreateInputSchema ]),
  update: z.union([ ModelWithCommentsUpdateInputSchema,ModelWithCommentsUncheckedUpdateInputSchema ]),
}).strict()

export default ModelWithCommentsUpsertArgsSchema
