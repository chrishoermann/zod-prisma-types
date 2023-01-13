import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { ProfileScalarWhereWithAggregatesInputSchema } from './ProfileScalarWhereWithAggregatesInputSchema';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { EnumRoleNullableListFilterSchema } from './EnumRoleNullableListFilterSchema';
import { EnumSecondEnumWithAggregatesFilterSchema } from './EnumSecondEnumWithAggregatesFilterSchema';
import { SecondEnumSchema } from './SecondEnumSchema';

export const ProfileScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.ProfileScalarWhereWithAggregatesInput> = z.object({
	AND: z.union([  ]).optional(),	OR: 	NOT: z.union([  ]).optional(),	id: z.union([ z.number().optional() ]).optional(),	bio: z.union([ z.string().optional() ]).optional(),	userId: z.union([ z.string().optional() ]).optional(),	role: 	second: z.union([  ]).optional(),}).strict();
