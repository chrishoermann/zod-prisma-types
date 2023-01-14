import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { MYValueSchema } from './MYValueSchema';

export const MODELWithUpperCaseUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  STRING: z.string(),
  MYValue: z.lazy(() => MYValueSchema),
}).strict()