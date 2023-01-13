import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { RoleSchema } from './RoleSchema';

export const EnumRoleNullableListFilterSchema: z.ZodType<PrismaClient.Prisma.EnumRoleNullableListFilter> = z.object({
	equals: 	has: 	hasEvery: 	hasSome: 	isEmpty: z.boolean().optional(),
}).strict();
