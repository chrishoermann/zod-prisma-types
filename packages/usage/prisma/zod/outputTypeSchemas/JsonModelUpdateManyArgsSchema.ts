import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { JsonModelUpdateManyMutationInputSchema } from '../inputTypeSchemas/JsonModelUpdateManyMutationInputSchema'
import { JsonModelUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/JsonModelUncheckedUpdateManyInputSchema'
import { JsonModelWhereInputSchema } from '../inputTypeSchemas/JsonModelWhereInputSchema'

export const JsonModelUpdateManyArgsSchema: z.ZodType<Prisma.JsonModelUpdateManyArgs> = z.object({
  data: z.union([ JsonModelUpdateManyMutationInputSchema,JsonModelUncheckedUpdateManyInputSchema ]),
  where: JsonModelWhereInputSchema.optional(),
}).strict()

export default JsonModelUpdateManyArgsSchema
