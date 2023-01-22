import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { WithDefaultValidatorsSelectSchema } from '../inputTypeSchemas/WithDefaultValidatorsSelectSchema'
import { WithDefaultValidatorsWhereUniqueInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsWhereUniqueInputSchema'

export const WithDefaultValidatorsFindUniqueArgsSchema: z.ZodType<Prisma.WithDefaultValidatorsFindUniqueArgs> = z.object({
  select: WithDefaultValidatorsSelectSchema.optional(),
  where: WithDefaultValidatorsWhereUniqueInputSchema,
}).strict()

export default WithDefaultValidatorsFindUniqueArgsSchema
