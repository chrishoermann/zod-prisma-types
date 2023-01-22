import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { NonDefaultModelSelectSchema } from '../inputTypeSchemas/NonDefaultModelSelectSchema'
import { NonDefaultModelUpdateInputSchema } from '../inputTypeSchemas/NonDefaultModelUpdateInputSchema'
import { NonDefaultModelUncheckedUpdateInputSchema } from '../inputTypeSchemas/NonDefaultModelUncheckedUpdateInputSchema'
import { NonDefaultModelWhereUniqueInputSchema } from '../inputTypeSchemas/NonDefaultModelWhereUniqueInputSchema'

export const NonDefaultModelUpdateArgsSchema: z.ZodType<Prisma.NonDefaultModelUpdateArgs> = z.object({
  select: NonDefaultModelSelectSchema.optional(),
  data: z.union([ NonDefaultModelUpdateInputSchema,NonDefaultModelUncheckedUpdateInputSchema ]),
  where: NonDefaultModelWhereUniqueInputSchema,
}).strict()

export default NonDefaultModelUpdateArgsSchema
