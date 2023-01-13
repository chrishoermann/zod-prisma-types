import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserCreateNestedOneWithoutProfileInputSchema } from './UserCreateNestedOneWithoutProfileInputSchema';
import { ProfileCreateroleInputSchema } from './ProfileCreateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { SecondEnumSchema } from './SecondEnumSchema';

export const ProfileCreateInputSchema: z.ZodType<PrismaClient.Prisma.ProfileCreateInput> = z.object({
	bio: z.string(),
	user: 	role: z.union([  ]).optional(),	second: }).strict();
