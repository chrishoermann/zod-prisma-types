import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { DecimalModelSelectSchema } from '../inputTypeSchemas/DecimalModelSelectSchema'
import { DecimalModelWhereUniqueInputSchema } from '../inputTypeSchemas/DecimalModelWhereUniqueInputSchema'

export const DecimalModelFindUniqueArgsSchema: z.ZodType<Prisma.DecimalModelFindUniqueArgs> = z.object({
  select: DecimalModelSelectSchema.optional(),
  where: DecimalModelWhereUniqueInputSchema,
}).strict()

export default DecimalModelFindUniqueArgsSchema
