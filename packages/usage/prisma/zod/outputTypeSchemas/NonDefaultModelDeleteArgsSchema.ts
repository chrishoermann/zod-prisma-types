import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { NonDefaultModelSelectSchema } from '../inputTypeSchemas/NonDefaultModelSelectSchema'
import { NonDefaultModelWhereUniqueInputSchema } from '../inputTypeSchemas/NonDefaultModelWhereUniqueInputSchema'

export const NonDefaultModelDeleteArgsSchema: z.ZodType<Prisma.NonDefaultModelDeleteArgs> = z.object({
  select: NonDefaultModelSelectSchema.optional(),
  where: NonDefaultModelWhereUniqueInputSchema,
}).strict()

export default NonDefaultModelDeleteArgsSchema
