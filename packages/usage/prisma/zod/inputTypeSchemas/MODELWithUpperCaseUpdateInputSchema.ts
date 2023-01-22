import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { MYValueSchema } from './MYValueSchema';
import { EnumMYValueFieldUpdateOperationsInputSchema } from './EnumMYValueFieldUpdateOperationsInputSchema';

export const MODELWithUpperCaseUpdateInputSchema: z.ZodType<Prisma.MODELWithUpperCaseUpdateInput> = z.object({
  STRING: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  MYValue: z.union([ z.lazy(() => MYValueSchema),z.lazy(() => EnumMYValueFieldUpdateOperationsInputSchema) ]).optional(),
}).strict()

export default MODELWithUpperCaseUpdateInputSchema
