import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { JsonModelWhereInputSchema } from '../inputTypeSchemas/JsonModelWhereInputSchema'

export const JsonModelDeleteManyArgsSchema: z.ZodType<Prisma.JsonModelDeleteManyArgs> = z.object({
  where: JsonModelWhereInputSchema.optional(),
}).strict()

export default JsonModelDeleteManyArgsSchema
