import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const ModelWithOmitFieldsCreateManyInputSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithOmitFieldsCreateManyInput, "omitField" | "omitRequired">> = z.object({
  id: z.string().cuid().optional(),
  string: z.string().optional().nullable(),
  // omitted: omitField: z.string().optional().nullable(),
  // omitted: omitRequired: z.string(),
}).strict()