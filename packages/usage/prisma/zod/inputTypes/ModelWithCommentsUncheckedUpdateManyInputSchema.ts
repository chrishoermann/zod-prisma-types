import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';

export const ModelWithCommentsUncheckedUpdateManyInputSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithCommentsUncheckedUpdateManyInput, "omitField" | "omitRequired">> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  string: z.union([ z.string().min(4).max(10),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  // omitted: omitField: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  // omitted: omitRequired: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict()