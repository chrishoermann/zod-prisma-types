import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { PostCreateNestedManyWithoutAuthorInputSchema } from './PostCreateNestedManyWithoutAuthorInputSchema';
import { UserCreateroleInputSchema } from './UserCreateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { UserCreatescalarListInputSchema } from './UserCreatescalarListInputSchema';
import { LocationCreateNestedOneWithoutUserInputSchema } from './LocationCreateNestedOneWithoutUserInputSchema';

export const UserCreateWithoutProfileInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateWithoutProfileInput> = z.object({
	id: z.string().optional(),
	email: z.string(),
	name: z.string().optional().nullable(),
	posts: 	role: z.union([  ]).optional(),	enum: 	scalarList: z.union([ z.string().array().optional() ]).optional(),	location: }).strict();
