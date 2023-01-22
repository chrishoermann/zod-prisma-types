import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { MODELWithUpperCaseUpdateManyMutationInputSchema } from '../inputTypeSchemas/MODELWithUpperCaseUpdateManyMutationInputSchema'
import { MODELWithUpperCaseUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/MODELWithUpperCaseUncheckedUpdateManyInputSchema'
import { MODELWithUpperCaseWhereInputSchema } from '../inputTypeSchemas/MODELWithUpperCaseWhereInputSchema'

export const MODELWithUpperCaseUpdateManyArgsSchema: z.ZodType<Prisma.MODELWithUpperCaseUpdateManyArgs> = z.object({
  data: z.union([ MODELWithUpperCaseUpdateManyMutationInputSchema,MODELWithUpperCaseUncheckedUpdateManyInputSchema ]),
  where: MODELWithUpperCaseWhereInputSchema.optional(),
}).strict()

export default MODELWithUpperCaseUpdateManyArgsSchema
