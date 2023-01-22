import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { MODELWithUpperCaseSelectSchema } from '../inputTypeSchemas/MODELWithUpperCaseSelectSchema'
import { MODELWithUpperCaseUpdateInputSchema } from '../inputTypeSchemas/MODELWithUpperCaseUpdateInputSchema'
import { MODELWithUpperCaseUncheckedUpdateInputSchema } from '../inputTypeSchemas/MODELWithUpperCaseUncheckedUpdateInputSchema'
import { MODELWithUpperCaseWhereUniqueInputSchema } from '../inputTypeSchemas/MODELWithUpperCaseWhereUniqueInputSchema'

export const MODELWithUpperCaseUpdateArgsSchema: z.ZodType<Prisma.MODELWithUpperCaseUpdateArgs> = z.object({
  select: MODELWithUpperCaseSelectSchema.optional(),
  data: z.union([ MODELWithUpperCaseUpdateInputSchema,MODELWithUpperCaseUncheckedUpdateInputSchema ]),
  where: MODELWithUpperCaseWhereUniqueInputSchema,
}).strict()

export default MODELWithUpperCaseUpdateArgsSchema
