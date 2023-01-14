import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const WithDefaultValidatorsWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.WithDefaultValidatorsWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict()