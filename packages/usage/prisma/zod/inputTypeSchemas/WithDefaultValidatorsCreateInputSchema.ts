import { z } from 'zod';
import { Prisma } from '@prisma/client';

export const WithDefaultValidatorsCreateInputSchema: z.ZodType<Prisma.WithDefaultValidatorsCreateInput> = z.object({
  id: z.string().cuid().optional(),
  idTwo: z.string().optional(),
  integer: z.number().int(),
}).strict()

export default WithDefaultValidatorsCreateInputSchema
