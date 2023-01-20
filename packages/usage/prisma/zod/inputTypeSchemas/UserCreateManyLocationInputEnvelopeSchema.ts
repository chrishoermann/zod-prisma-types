import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { UserCreateManyLocationInputSchema } from './UserCreateManyLocationInputSchema';

export const UserCreateManyLocationInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyLocationInputEnvelope> = z.object({
  data: z.lazy(() => UserCreateManyLocationInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default UserCreateManyLocationInputEnvelopeSchema
