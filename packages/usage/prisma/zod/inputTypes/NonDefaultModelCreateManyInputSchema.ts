import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const NonDefaultModelCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.NonDefaultModelCreateManyInput> = z.object({
  id: z.number().int(),
  string: z.string(),
}).strict()