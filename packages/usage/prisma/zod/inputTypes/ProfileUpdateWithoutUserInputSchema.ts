import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { ProfileUpdateroleInputSchema } from './ProfileUpdateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { SecondEnumSchema } from './SecondEnumSchema';
import { EnumSecondEnumFieldUpdateOperationsInputSchema } from './EnumSecondEnumFieldUpdateOperationsInputSchema';

export const ProfileUpdateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.ProfileUpdateWithoutUserInput> = z.object({
	bio: z.union([ z.string().optional(), 
 ]).optional(),	role: z.union([  ]).optional(),	second: z.union([  ]).optional(),}).strict();
