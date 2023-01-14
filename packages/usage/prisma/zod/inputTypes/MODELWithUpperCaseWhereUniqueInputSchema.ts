import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const MODELWithUpperCaseWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseWhereUniqueInput> = z.object({
  id: z.number().int().optional(),
}).strict()