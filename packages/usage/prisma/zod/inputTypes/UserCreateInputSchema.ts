import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { PostCreateNestedManyWithoutAuthorInputSchema } from './PostCreateNestedManyWithoutAuthorInputSchema';
import { ProfileCreateNestedOneWithoutUserInputSchema } from './ProfileCreateNestedOneWithoutUserInputSchema';
import { UserCreateroleInputSchema } from './UserCreateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { UserCreatescalarListInputSchema } from './UserCreatescalarListInputSchema';
import { LocationCreateNestedOneWithoutUserInputSchema } from './LocationCreateNestedOneWithoutUserInputSchema';

export const UserCreateInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateInput> = z.object({
	id: z.string().cuid().optional(),
	email: z.string().email({ message: "Invalid email address" }),
	name: z.string().min(1).max(100).optional().nullable(),
	posts: 	profile: 	role: z.union([  ]).optional(),	enum: 	scalarList: z.union([ z.string().array().optional() ]).optional(),	location: }).strict();
