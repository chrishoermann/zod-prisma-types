import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { UserUpdateOneRequiredWithoutProfileNestedInputSchema } from './UserUpdateOneRequiredWithoutProfileNestedInputSchema';
import { ProfileUpdateroleInputSchema } from './ProfileUpdateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { SecondEnumSchema } from './SecondEnumSchema';
import { EnumSecondEnumFieldUpdateOperationsInputSchema } from './EnumSecondEnumFieldUpdateOperationsInputSchema';

export const ProfileUpdateInputSchema: z.ZodType<Prisma.ProfileUpdateInput> = z.object({
  bio: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileNestedInputSchema).optional(),
  role: z.union([ z.lazy(() => ProfileUpdateroleInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  second: z.union([ z.lazy(() => SecondEnumSchema),z.lazy(() => EnumSecondEnumFieldUpdateOperationsInputSchema) ]).optional(),
}).strict()

export default ProfileUpdateInputSchema
