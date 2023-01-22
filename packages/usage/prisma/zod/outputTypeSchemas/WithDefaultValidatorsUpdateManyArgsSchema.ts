import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { WithDefaultValidatorsUpdateManyMutationInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsUpdateManyMutationInputSchema'
import { WithDefaultValidatorsUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsUncheckedUpdateManyInputSchema'
import { WithDefaultValidatorsWhereInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsWhereInputSchema'

export const WithDefaultValidatorsUpdateManyArgsSchema: z.ZodType<Prisma.WithDefaultValidatorsUpdateManyArgs> = z.object({
  data: z.union([ WithDefaultValidatorsUpdateManyMutationInputSchema,WithDefaultValidatorsUncheckedUpdateManyInputSchema ]),
  where: WithDefaultValidatorsWhereInputSchema.optional(),
}).strict()

export default WithDefaultValidatorsUpdateManyArgsSchema
