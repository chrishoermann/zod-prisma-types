import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const WithDefaultValidatorsUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.WithDefaultValidatorsUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  idTwo: z.string().optional(),
  integer: z.number().int(),
}).strict()