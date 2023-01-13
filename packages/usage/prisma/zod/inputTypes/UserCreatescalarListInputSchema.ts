import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const UserCreatescalarListInputSchema: z.ZodType<PrismaClient.Prisma.UserCreatescalarListInput> = z.object({
	set: z.string().array(),
}).strict();
