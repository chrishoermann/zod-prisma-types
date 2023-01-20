import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { SecondEnumSchema } from './SecondEnumSchema';

export const EnumSecondEnumFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSecondEnumFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SecondEnumSchema).optional(),
}).strict()

export default EnumSecondEnumFieldUpdateOperationsInputSchema
