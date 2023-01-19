import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const DecimalModelWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.DecimalModelWhereUniqueInput> = z.object({
  id: z.number().int().optional(),
}).strict()