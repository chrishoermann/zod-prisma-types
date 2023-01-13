import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { UserUpdateOneRequiredWithoutProfileNestedInputSchema } from './UserUpdateOneRequiredWithoutProfileNestedInputSchema';
import { ProfileUpdateroleInputSchema } from './ProfileUpdateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { SecondEnumSchema } from './SecondEnumSchema';
import { EnumSecondEnumFieldUpdateOperationsInputSchema } from './EnumSecondEnumFieldUpdateOperationsInputSchema';

export const ProfileUpdateInputSchema: z.ZodType<PrismaClient.Prisma.ProfileUpdateInput> = z.object({
	bio: z.union([ z.string().optional(), 
 ]).optional(),	user: 	role: z.union([  ]).optional(),	second: z.union([  ]).optional(),}).strict();
