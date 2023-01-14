import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserCreateManyLocationInputSchema } from './UserCreateManyLocationInputSchema';

export const UserCreateManyLocationInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.UserCreateManyLocationInputEnvelope> = z.object({
  data: z.lazy(() => UserCreateManyLocationInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict()