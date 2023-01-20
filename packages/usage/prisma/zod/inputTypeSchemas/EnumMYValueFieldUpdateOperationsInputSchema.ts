import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { MYValueSchema } from './MYValueSchema';

export const EnumMYValueFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumMYValueFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => MYValueSchema).optional(),
}).strict()

export default EnumMYValueFieldUpdateOperationsInputSchema
