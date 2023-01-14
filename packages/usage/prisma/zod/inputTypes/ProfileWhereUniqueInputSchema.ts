import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const ProfileWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.ProfileWhereUniqueInput> = z.object({
  id: z.number().int().optional(),
  userId: z.string().optional(),
}).strict()