import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { WithDefaultValidatorsSelectSchema } from '../inputTypeSchemas/WithDefaultValidatorsSelectSchema'
import { WithDefaultValidatorsWhereUniqueInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsWhereUniqueInputSchema'

export const WithDefaultValidatorsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WithDefaultValidatorsFindUniqueOrThrowArgs> = z.object({
  select: WithDefaultValidatorsSelectSchema.optional(),
  where: WithDefaultValidatorsWhereUniqueInputSchema,
}).strict()

export default WithDefaultValidatorsFindUniqueOrThrowArgsSchema
