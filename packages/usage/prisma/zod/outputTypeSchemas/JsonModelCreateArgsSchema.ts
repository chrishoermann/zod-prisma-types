import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { JsonModelSelectSchema } from '../inputTypeSchemas/JsonModelSelectSchema'
import { JsonModelCreateInputSchema } from '../inputTypeSchemas/JsonModelCreateInputSchema'
import { JsonModelUncheckedCreateInputSchema } from '../inputTypeSchemas/JsonModelUncheckedCreateInputSchema'

export const JsonModelCreateArgsSchema: z.ZodType<Prisma.JsonModelCreateArgs> = z.object({
  select: JsonModelSelectSchema.optional(),
  data: z.union([ JsonModelCreateInputSchema,JsonModelUncheckedCreateInputSchema ]),
}).strict()

export default JsonModelCreateArgsSchema
