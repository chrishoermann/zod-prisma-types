import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { WithDefaultValidatorsWhereInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsWhereInputSchema'

export const WithDefaultValidatorsDeleteManyArgsSchema: z.ZodType<Prisma.WithDefaultValidatorsDeleteManyArgs> = z.object({
  where: WithDefaultValidatorsWhereInputSchema.optional(),
}).strict()

export default WithDefaultValidatorsDeleteManyArgsSchema
