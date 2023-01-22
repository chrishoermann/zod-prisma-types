import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { NonDefaultModelUpdateManyMutationInputSchema } from '../inputTypeSchemas/NonDefaultModelUpdateManyMutationInputSchema'
import { NonDefaultModelUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/NonDefaultModelUncheckedUpdateManyInputSchema'
import { NonDefaultModelWhereInputSchema } from '../inputTypeSchemas/NonDefaultModelWhereInputSchema'

export const NonDefaultModelUpdateManyArgsSchema: z.ZodType<Prisma.NonDefaultModelUpdateManyArgs> = z.object({
  data: z.union([ NonDefaultModelUpdateManyMutationInputSchema,NonDefaultModelUncheckedUpdateManyInputSchema ]),
  where: NonDefaultModelWhereInputSchema.optional(),
}).strict()

export default NonDefaultModelUpdateManyArgsSchema
