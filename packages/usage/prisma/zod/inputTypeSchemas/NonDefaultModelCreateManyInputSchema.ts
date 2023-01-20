import { z } from 'zod';
import { Prisma } from '@prisma/client';

export const NonDefaultModelCreateManyInputSchema: z.ZodType<Prisma.NonDefaultModelCreateManyInput> = z.object({
  id: z.number().int(),
  string: z.string(),
}).strict()

export default NonDefaultModelCreateManyInputSchema
