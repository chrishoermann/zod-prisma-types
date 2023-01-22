import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { JsonModelSelectSchema } from '../inputTypeSchemas/JsonModelSelectSchema'
import { JsonModelUpdateInputSchema } from '../inputTypeSchemas/JsonModelUpdateInputSchema'
import { JsonModelUncheckedUpdateInputSchema } from '../inputTypeSchemas/JsonModelUncheckedUpdateInputSchema'
import { JsonModelWhereUniqueInputSchema } from '../inputTypeSchemas/JsonModelWhereUniqueInputSchema'

export const JsonModelUpdateArgsSchema: z.ZodType<Prisma.JsonModelUpdateArgs> = z.object({
  select: JsonModelSelectSchema.optional(),
  data: z.union([ JsonModelUpdateInputSchema,JsonModelUncheckedUpdateInputSchema ]),
  where: JsonModelWhereUniqueInputSchema,
}).strict()

export default JsonModelUpdateArgsSchema
