import { z } from 'zod';
import { Prisma } from '@prisma/client';

export const ModelWithOmitFieldsWhereUniqueInputSchema: z.ZodType<Prisma.ModelWithOmitFieldsWhereUniqueInput> = z.object({
  id: z.string().optional(),
}).strict()

export default ModelWithOmitFieldsWhereUniqueInputSchema
