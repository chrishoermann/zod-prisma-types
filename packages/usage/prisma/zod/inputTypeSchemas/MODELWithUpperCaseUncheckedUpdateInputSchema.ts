import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { MYValueSchema } from './MYValueSchema';
import { EnumMYValueFieldUpdateOperationsInputSchema } from './EnumMYValueFieldUpdateOperationsInputSchema';

export const MODELWithUpperCaseUncheckedUpdateInputSchema: z.ZodType<Prisma.MODELWithUpperCaseUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  STRING: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  MYValue: z.union([ z.lazy(() => MYValueSchema),z.lazy(() => EnumMYValueFieldUpdateOperationsInputSchema) ]).optional(),
}).strict()

export default MODELWithUpperCaseUncheckedUpdateInputSchema
