import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { NonDefaultModelSelectSchema } from '../inputTypeSchemas/NonDefaultModelSelectSchema'
import { NonDefaultModelWhereUniqueInputSchema } from '../inputTypeSchemas/NonDefaultModelWhereUniqueInputSchema'
import { NonDefaultModelCreateInputSchema } from '../inputTypeSchemas/NonDefaultModelCreateInputSchema'
import { NonDefaultModelUncheckedCreateInputSchema } from '../inputTypeSchemas/NonDefaultModelUncheckedCreateInputSchema'
import { NonDefaultModelUpdateInputSchema } from '../inputTypeSchemas/NonDefaultModelUpdateInputSchema'
import { NonDefaultModelUncheckedUpdateInputSchema } from '../inputTypeSchemas/NonDefaultModelUncheckedUpdateInputSchema'

export const NonDefaultModelUpsertArgsSchema: z.ZodType<Prisma.NonDefaultModelUpsertArgs> = z.object({
  select: NonDefaultModelSelectSchema.optional(),
  where: NonDefaultModelWhereUniqueInputSchema,
  create: z.union([ NonDefaultModelCreateInputSchema,NonDefaultModelUncheckedCreateInputSchema ]),
  update: z.union([ NonDefaultModelUpdateInputSchema,NonDefaultModelUncheckedUpdateInputSchema ]),
}).strict()

export default NonDefaultModelUpsertArgsSchema
