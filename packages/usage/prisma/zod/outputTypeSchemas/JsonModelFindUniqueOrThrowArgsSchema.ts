import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { JsonModelSelectSchema } from '../inputTypeSchemas/JsonModelSelectSchema'
import { JsonModelWhereUniqueInputSchema } from '../inputTypeSchemas/JsonModelWhereUniqueInputSchema'

export const JsonModelFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.JsonModelFindUniqueOrThrowArgs> = z.object({
  select: JsonModelSelectSchema.optional(),
  where: JsonModelWhereUniqueInputSchema,
}).strict()

export default JsonModelFindUniqueOrThrowArgsSchema
