import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { JsonModelSelectSchema } from '../inputTypeSchemas/JsonModelSelectSchema'
import { JsonModelWhereUniqueInputSchema } from '../inputTypeSchemas/JsonModelWhereUniqueInputSchema'

export const JsonModelFindUniqueArgsSchema: z.ZodType<Prisma.JsonModelFindUniqueArgs> = z.object({
  select: JsonModelSelectSchema.optional(),
  where: JsonModelWhereUniqueInputSchema,
}).strict()

export default JsonModelFindUniqueArgsSchema
