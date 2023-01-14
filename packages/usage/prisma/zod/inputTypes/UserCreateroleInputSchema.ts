import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { RoleSchema } from './RoleSchema';

export const UserCreateroleInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateroleInput> = z.object({
  set: z.lazy(() => RoleSchema).array(),
}).strict()