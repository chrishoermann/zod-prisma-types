import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { WithDefaultValidatorsSelectSchema } from '../inputTypeSchemas/WithDefaultValidatorsSelectSchema'
import { WithDefaultValidatorsUpdateInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsUpdateInputSchema'
import { WithDefaultValidatorsUncheckedUpdateInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsUncheckedUpdateInputSchema'
import { WithDefaultValidatorsWhereUniqueInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsWhereUniqueInputSchema'

export const WithDefaultValidatorsUpdateArgsSchema: z.ZodType<Prisma.WithDefaultValidatorsUpdateArgs> = z.object({
  select: WithDefaultValidatorsSelectSchema.optional(),
  data: z.union([ WithDefaultValidatorsUpdateInputSchema,WithDefaultValidatorsUncheckedUpdateInputSchema ]),
  where: WithDefaultValidatorsWhereUniqueInputSchema,
}).strict()

export default WithDefaultValidatorsUpdateArgsSchema
