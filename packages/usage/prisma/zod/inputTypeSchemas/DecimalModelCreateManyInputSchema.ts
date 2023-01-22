import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { DecimalJSLikeSchema, isValidDecimalInput } from '.';

export const DecimalModelCreateManyInputSchema: z.ZodType<Prisma.DecimalModelCreateManyInput> = z.object({
  id: z.number().int().optional(),
  decimal: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  decimalOpt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
}).strict()

export default DecimalModelCreateManyInputSchema
