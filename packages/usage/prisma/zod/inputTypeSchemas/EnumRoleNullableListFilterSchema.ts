import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { RoleSchema } from './RoleSchema';

export const EnumRoleNullableListFilterSchema: z.ZodType<Prisma.EnumRoleNullableListFilter> = z.object({
  equals: z.lazy(() => RoleSchema).array().optional().nullable(),
  has: z.lazy(() => RoleSchema).optional().nullable(),
  hasEvery: z.lazy(() => RoleSchema).array().optional(),
  hasSome: z.lazy(() => RoleSchema).array().optional(),
  isEmpty: z.boolean().optional(),
}).strict()

export default EnumRoleNullableListFilterSchema
