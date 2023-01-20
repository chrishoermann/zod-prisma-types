import { z } from 'zod';
import { Prisma } from '@prisma/client';

export const JsonModelWhereUniqueInputSchema: z.ZodType<Prisma.JsonModelWhereUniqueInput> = z.object({
  id: z.number().optional(),
}).strict()

export default JsonModelWhereUniqueInputSchema
