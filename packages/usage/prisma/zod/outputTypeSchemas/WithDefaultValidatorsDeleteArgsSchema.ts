import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { WithDefaultValidatorsSelectSchema } from '../inputTypeSchemas/WithDefaultValidatorsSelectSchema'
import { WithDefaultValidatorsWhereUniqueInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsWhereUniqueInputSchema'

export const WithDefaultValidatorsDeleteArgsSchema: z.ZodType<Prisma.WithDefaultValidatorsDeleteArgs> = z.object({
  select: WithDefaultValidatorsSelectSchema.optional(),
  where: WithDefaultValidatorsWhereUniqueInputSchema,
}).strict()

export default WithDefaultValidatorsDeleteArgsSchema
