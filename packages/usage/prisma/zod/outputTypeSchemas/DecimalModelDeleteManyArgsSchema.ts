import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { DecimalModelWhereInputSchema } from '../inputTypeSchemas/DecimalModelWhereInputSchema'

export const DecimalModelDeleteManyArgsSchema: z.ZodType<Prisma.DecimalModelDeleteManyArgs> = z.object({
  where: DecimalModelWhereInputSchema.optional(),
}).strict()

export default DecimalModelDeleteManyArgsSchema
