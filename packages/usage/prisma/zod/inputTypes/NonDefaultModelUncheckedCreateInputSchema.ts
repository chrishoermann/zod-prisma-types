import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const NonDefaultModelUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.NonDefaultModelUncheckedCreateInput> = z.object({
	id: z.number().int(),
	string: z.string(),
}).strict();
