import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { MODELWithUpperCaseSelectSchema } from '../inputTypeSchemas/MODELWithUpperCaseSelectSchema'
import { MODELWithUpperCaseCreateInputSchema } from '../inputTypeSchemas/MODELWithUpperCaseCreateInputSchema'
import { MODELWithUpperCaseUncheckedCreateInputSchema } from '../inputTypeSchemas/MODELWithUpperCaseUncheckedCreateInputSchema'

export const MODELWithUpperCaseCreateArgsSchema: z.ZodType<Prisma.MODELWithUpperCaseCreateArgs> = z.object({
  select: MODELWithUpperCaseSelectSchema.optional(),
  data: z.union([ MODELWithUpperCaseCreateInputSchema,MODELWithUpperCaseUncheckedCreateInputSchema ]),
}).strict()

export default MODELWithUpperCaseCreateArgsSchema
