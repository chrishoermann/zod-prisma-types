import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserCreateManyLocationInputSchema } from './UserCreateManyLocationInputSchema';

export const UserCreateManyLocationInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.UserCreateManyLocationInputEnvelope> = z.object({
	data: 	skipDuplicates: z.boolean().optional(),
}).strict();
