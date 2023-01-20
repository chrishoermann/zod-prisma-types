import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { AnotherEnumSchema } from './AnotherEnumSchema';

export const EnumAnotherEnumFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumAnotherEnumFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => AnotherEnumSchema).optional(),
}).strict()

export default EnumAnotherEnumFieldUpdateOperationsInputSchema
