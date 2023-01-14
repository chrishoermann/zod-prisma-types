import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { RoleSchema } from './RoleSchema';

export const UserUpdateroleInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateroleInput> = z.object({
  set: z.lazy(() => RoleSchema).array().optional(),
  push: z.union([ z.lazy(() => RoleSchema),z.lazy(() => RoleSchema).array() ]).optional(),
}).strict()