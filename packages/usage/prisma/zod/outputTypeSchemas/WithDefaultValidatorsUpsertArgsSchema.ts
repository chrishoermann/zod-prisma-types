import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { WithDefaultValidatorsSelectSchema } from '../inputTypeSchemas/WithDefaultValidatorsSelectSchema'
import { WithDefaultValidatorsWhereUniqueInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsWhereUniqueInputSchema'
import { WithDefaultValidatorsCreateInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsCreateInputSchema'
import { WithDefaultValidatorsUncheckedCreateInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsUncheckedCreateInputSchema'
import { WithDefaultValidatorsUpdateInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsUpdateInputSchema'
import { WithDefaultValidatorsUncheckedUpdateInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsUncheckedUpdateInputSchema'

export const WithDefaultValidatorsUpsertArgsSchema: z.ZodType<Prisma.WithDefaultValidatorsUpsertArgs> = z.object({
  select: WithDefaultValidatorsSelectSchema.optional(),
  where: WithDefaultValidatorsWhereUniqueInputSchema,
  create: z.union([ WithDefaultValidatorsCreateInputSchema,WithDefaultValidatorsUncheckedCreateInputSchema ]),
  update: z.union([ WithDefaultValidatorsUpdateInputSchema,WithDefaultValidatorsUncheckedUpdateInputSchema ]),
}).strict()

export default WithDefaultValidatorsUpsertArgsSchema
