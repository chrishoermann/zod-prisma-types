import { z } from 'zod';
import { Prisma } from '@prisma/client';

export const UserUpdatescalarListInputSchema: z.ZodType<Prisma.UserUpdatescalarListInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict()

export default UserUpdatescalarListInputSchema
