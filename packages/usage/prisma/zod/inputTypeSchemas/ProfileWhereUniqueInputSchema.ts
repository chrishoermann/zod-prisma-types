import { z } from 'zod';
import { Prisma } from '@prisma/client';

export const ProfileWhereUniqueInputSchema: z.ZodType<Prisma.ProfileWhereUniqueInput> = z.object({
  id: z.number().optional(),
  userId: z.string().optional(),
}).strict()

export default ProfileWhereUniqueInputSchema
