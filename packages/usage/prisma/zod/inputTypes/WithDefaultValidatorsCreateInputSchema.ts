import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const WithDefaultValidatorsCreateInputSchema: z.ZodType<PrismaClient.Prisma.WithDefaultValidatorsCreateInput> = z.object({
  id: z.string().cuid().optional(),
  idTwo: z.string().optional(),
  integer: z.number().int(),
}).strict()