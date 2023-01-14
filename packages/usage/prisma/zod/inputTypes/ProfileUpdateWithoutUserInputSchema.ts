import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { ProfileUpdateroleInputSchema } from './ProfileUpdateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { SecondEnumSchema } from './SecondEnumSchema';
import { EnumSecondEnumFieldUpdateOperationsInputSchema } from './EnumSecondEnumFieldUpdateOperationsInputSchema';

export const ProfileUpdateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.ProfileUpdateWithoutUserInput> = z.object({
  bio: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => ProfileUpdateroleInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  second: z.union([ z.lazy(() => SecondEnumSchema),z.lazy(() => EnumSecondEnumFieldUpdateOperationsInputSchema) ]).optional(),
}).strict()