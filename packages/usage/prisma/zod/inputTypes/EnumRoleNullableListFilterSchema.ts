import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { RoleSchema } from './RoleSchema';

export const EnumRoleNullableListFilterSchema: z.ZodType<PrismaClient.Prisma.EnumRoleNullableListFilter> = z.object({
  equals: z.lazy(() => RoleSchema).array().optional().nullable(),
  has: z.lazy(() => RoleSchema).optional().nullable(),
  hasEvery: z.lazy(() => RoleSchema).array().optional(),
  hasSome: z.lazy(() => RoleSchema).array().optional(),
  isEmpty: z.boolean().optional(),
}).strict()