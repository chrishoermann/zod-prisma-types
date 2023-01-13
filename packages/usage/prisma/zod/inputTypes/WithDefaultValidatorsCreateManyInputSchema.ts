import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const WithDefaultValidatorsCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.WithDefaultValidatorsCreateManyInput> = z.object({
	id: z.string().cuid().optional(),
	idTwo: z.string().optional(),
	integer: z.number().int(),
}).strict();
