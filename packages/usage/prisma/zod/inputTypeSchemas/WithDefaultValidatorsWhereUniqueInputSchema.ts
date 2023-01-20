import { z } from 'zod';
import { Prisma } from '@prisma/client';

export const WithDefaultValidatorsWhereUniqueInputSchema: z.ZodType<Prisma.WithDefaultValidatorsWhereUniqueInput> = z.object({
  id: z.string().optional(),
}).strict()

export default WithDefaultValidatorsWhereUniqueInputSchema
