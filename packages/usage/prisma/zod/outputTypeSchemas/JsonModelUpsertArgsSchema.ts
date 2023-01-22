import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { JsonModelSelectSchema } from '../inputTypeSchemas/JsonModelSelectSchema'
import { JsonModelWhereUniqueInputSchema } from '../inputTypeSchemas/JsonModelWhereUniqueInputSchema'
import { JsonModelCreateInputSchema } from '../inputTypeSchemas/JsonModelCreateInputSchema'
import { JsonModelUncheckedCreateInputSchema } from '../inputTypeSchemas/JsonModelUncheckedCreateInputSchema'
import { JsonModelUpdateInputSchema } from '../inputTypeSchemas/JsonModelUpdateInputSchema'
import { JsonModelUncheckedUpdateInputSchema } from '../inputTypeSchemas/JsonModelUncheckedUpdateInputSchema'

export const JsonModelUpsertArgsSchema: z.ZodType<Prisma.JsonModelUpsertArgs> = z.object({
  select: JsonModelSelectSchema.optional(),
  where: JsonModelWhereUniqueInputSchema,
  create: z.union([ JsonModelCreateInputSchema,JsonModelUncheckedCreateInputSchema ]),
  update: z.union([ JsonModelUpdateInputSchema,JsonModelUncheckedUpdateInputSchema ]),
}).strict()

export default JsonModelUpsertArgsSchema
