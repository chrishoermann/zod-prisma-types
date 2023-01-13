import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { ProfileCreateNestedOneWithoutUserInputSchema } from './ProfileCreateNestedOneWithoutUserInputSchema';
import { UserCreateroleInputSchema } from './UserCreateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { UserCreatescalarListInputSchema } from './UserCreatescalarListInputSchema';
import { LocationCreateNestedOneWithoutUserInputSchema } from './LocationCreateNestedOneWithoutUserInputSchema';

export const UserCreateWithoutPostsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateWithoutPostsInput> = z.object({
	id: z.string().optional(),
	email: z.string(),
	name: z.string().optional().nullable(),
	profile: 	role: z.union([  ]).optional(),	enum: 	scalarList: z.union([ z.string().array().optional() ]).optional(),	location: }).strict();
