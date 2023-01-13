import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { ProfileWhereInputSchema } from './ProfileWhereInputSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { EnumRoleNullableListFilterSchema } from './EnumRoleNullableListFilterSchema';
import { EnumSecondEnumFilterSchema } from './EnumSecondEnumFilterSchema';
import { SecondEnumSchema } from './SecondEnumSchema';

export const ProfileWhereInputSchema: z.ZodType<PrismaClient.Prisma.ProfileWhereInput> = z.object({
	AND: z.union([  ]).optional(),	OR: 	NOT: z.union([  ]).optional(),	id: z.union([ z.number().optional() ]).optional(),	bio: z.union([ z.string().optional() ]).optional(),	user: z.union([  ]).optional(),	userId: z.union([ z.string().optional() ]).optional(),	role: 	second: z.union([  ]).optional(),}).strict();
