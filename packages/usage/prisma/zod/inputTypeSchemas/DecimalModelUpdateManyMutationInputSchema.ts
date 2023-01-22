import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { DecimalJSLikeSchema, isValidDecimalInput } from '.';
import { DecimalFieldUpdateOperationsInputSchema } from './DecimalFieldUpdateOperationsInputSchema';
import { NullableDecimalFieldUpdateOperationsInputSchema } from './NullableDecimalFieldUpdateOperationsInputSchema';

export const DecimalModelUpdateManyMutationInputSchema: z.ZodType<Prisma.DecimalModelUpdateManyMutationInput> = z.object({
  decimal: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  decimalOpt: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict()

export default DecimalModelUpdateManyMutationInputSchema
