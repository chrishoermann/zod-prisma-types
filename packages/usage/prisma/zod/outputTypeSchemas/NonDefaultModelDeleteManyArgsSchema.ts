import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { NonDefaultModelWhereInputSchema } from '../inputTypeSchemas/NonDefaultModelWhereInputSchema'

export const NonDefaultModelDeleteManyArgsSchema: z.ZodType<Prisma.NonDefaultModelDeleteManyArgs> = z.object({
  where: NonDefaultModelWhereInputSchema.optional(),
}).strict()

export default NonDefaultModelDeleteManyArgsSchema
