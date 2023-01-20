import { z } from 'zod';
import { Prisma } from '@prisma/client';

export const NonDefaultModelCreateInputSchema: z.ZodType<Prisma.NonDefaultModelCreateInput> = z.object({
  id: z.number().int(),
  string: z.string(),
}).strict()

export default NonDefaultModelCreateInputSchema
