import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { NonDefaultModelSelectSchema } from '../inputTypeSchemas/NonDefaultModelSelectSchema'
import { NonDefaultModelCreateInputSchema } from '../inputTypeSchemas/NonDefaultModelCreateInputSchema'
import { NonDefaultModelUncheckedCreateInputSchema } from '../inputTypeSchemas/NonDefaultModelUncheckedCreateInputSchema'

export const NonDefaultModelCreateArgsSchema: z.ZodType<Prisma.NonDefaultModelCreateArgs> = z.object({
  select: NonDefaultModelSelectSchema.optional(),
  data: z.union([ NonDefaultModelCreateInputSchema,NonDefaultModelUncheckedCreateInputSchema ]),
}).strict()

export default NonDefaultModelCreateArgsSchema
