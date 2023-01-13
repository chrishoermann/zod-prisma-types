import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const NonDefaultModelCreateInputSchema: z.ZodType<PrismaClient.Prisma.NonDefaultModelCreateInput> = z.object({
	id: z.number().int(),
	string: z.string(),
}).strict();
