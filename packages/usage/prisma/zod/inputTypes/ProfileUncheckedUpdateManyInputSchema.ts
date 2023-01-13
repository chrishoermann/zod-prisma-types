import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { ProfileUpdateroleInputSchema } from './ProfileUpdateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { SecondEnumSchema } from './SecondEnumSchema';
import { EnumSecondEnumFieldUpdateOperationsInputSchema } from './EnumSecondEnumFieldUpdateOperationsInputSchema';

export const ProfileUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.ProfileUncheckedUpdateManyInput> = z.object({
	id: z.union([ z.number().int().optional(), 
 ]).optional(),	bio: z.union([ z.string().optional(), 
 ]).optional(),	userId: z.union([ z.string().optional(), 
 ]).optional(),	role: z.union([  ]).optional(),	second: z.union([  ]).optional(),}).strict();
