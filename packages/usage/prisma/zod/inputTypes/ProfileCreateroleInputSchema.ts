import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { RoleSchema } from './RoleSchema';

export const ProfileCreateroleInputSchema: z.ZodType<PrismaClient.Prisma.ProfileCreateroleInput> = z.object({
  set: z.lazy(() => RoleSchema).array(),
}).strict()