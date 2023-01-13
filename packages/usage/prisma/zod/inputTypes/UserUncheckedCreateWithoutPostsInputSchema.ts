import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { ProfileUncheckedCreateNestedOneWithoutUserInputSchema } from './ProfileUncheckedCreateNestedOneWithoutUserInputSchema';
import { UserCreateroleInputSchema } from './UserCreateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { UserCreatescalarListInputSchema } from './UserCreatescalarListInputSchema';

export const UserUncheckedCreateWithoutPostsInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateWithoutPostsInput> = z.object({
	id: z.string().optional(),
	email: z.string(),
	name: z.string().optional().nullable(),
	profile: 	role: z.union([  ]).optional(),	enum: 	scalarList: z.union([ z.string().array().optional() ]).optional(),	lat: z.number(),
	lng: z.number(),
}).strict();
