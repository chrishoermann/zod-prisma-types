import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { RoleSchema } from './RoleSchema';

export const UserCreateroleInputSchema: z.ZodType<Prisma.UserCreateroleInput> = z.object({
  set: z.lazy(() => RoleSchema).array(),
}).strict()

export default UserCreateroleInputSchema
