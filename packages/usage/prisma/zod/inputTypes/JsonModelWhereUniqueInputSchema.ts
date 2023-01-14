import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const JsonModelWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelWhereUniqueInput> = z.object({
  id: z.number().int().optional(),
}).strict()