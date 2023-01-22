import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { WithDefaultValidatorsSelectSchema } from '../inputTypeSchemas/WithDefaultValidatorsSelectSchema'
import { WithDefaultValidatorsCreateInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsCreateInputSchema'
import { WithDefaultValidatorsUncheckedCreateInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsUncheckedCreateInputSchema'

export const WithDefaultValidatorsCreateArgsSchema: z.ZodType<Prisma.WithDefaultValidatorsCreateArgs> = z.object({
  select: WithDefaultValidatorsSelectSchema.optional(),
  data: z.union([ WithDefaultValidatorsCreateInputSchema,WithDefaultValidatorsUncheckedCreateInputSchema ]),
}).strict()

export default WithDefaultValidatorsCreateArgsSchema
