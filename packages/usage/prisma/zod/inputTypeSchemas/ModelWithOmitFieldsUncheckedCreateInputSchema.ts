import { z } from 'zod';
import { Prisma } from '@prisma/client';

export const ModelWithOmitFieldsUncheckedCreateInputSchema: z.ZodType<Omit<Prisma.ModelWithOmitFieldsUncheckedCreateInput, "omitField" | "omitRequired">> = z.object({
  id: z.string().cuid().optional(),
  string: z.string().optional().nullable(),
  // omitted: omitField: z.string().optional().nullable(),
  // omitted: omitRequired: z.string(),
}).strict()

export default ModelWithOmitFieldsUncheckedCreateInputSchema
