import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SecondEnumSchema } from './SecondEnumSchema';

export const EnumSecondEnumFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.EnumSecondEnumFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SecondEnumSchema).optional(),
}).strict()