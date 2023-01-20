import { z } from 'zod';
import { Prisma } from '@prisma/client';

export const UserCreatescalarListInputSchema: z.ZodType<Prisma.UserCreatescalarListInput> = z.object({
  set: z.string().array(),
}).strict()

export default UserCreatescalarListInputSchema
