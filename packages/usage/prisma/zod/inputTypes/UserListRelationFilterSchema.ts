import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional(),
}).strict()