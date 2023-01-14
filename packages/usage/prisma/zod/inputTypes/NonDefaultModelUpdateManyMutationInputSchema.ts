import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';

export const NonDefaultModelUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.NonDefaultModelUpdateManyMutationInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  string: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict()