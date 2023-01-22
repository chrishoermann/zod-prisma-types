import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { NonDefaultModelSelectSchema } from '../inputTypeSchemas/NonDefaultModelSelectSchema'
import { NonDefaultModelWhereUniqueInputSchema } from '../inputTypeSchemas/NonDefaultModelWhereUniqueInputSchema'

export const NonDefaultModelFindUniqueArgsSchema: z.ZodType<Prisma.NonDefaultModelFindUniqueArgs> = z.object({
  select: NonDefaultModelSelectSchema.optional(),
  where: NonDefaultModelWhereUniqueInputSchema,
}).strict()

export default NonDefaultModelFindUniqueArgsSchema
