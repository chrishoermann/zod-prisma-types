import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { JsonModelCreateManyInputSchema } from '../inputTypeSchemas/JsonModelCreateManyInputSchema'

export const JsonModelCreateManyArgsSchema: z.ZodType<Prisma.JsonModelCreateManyArgs> = z.object({
  data: JsonModelCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default JsonModelCreateManyArgsSchema
