import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const UserWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
}).strict()