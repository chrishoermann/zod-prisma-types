import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { MyPrismaScalarsTypeUpdateManyMutationInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeUpdateManyMutationInputSchema'
import { MyPrismaScalarsTypeUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeUncheckedUpdateManyInputSchema'
import { MyPrismaScalarsTypeWhereInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeWhereInputSchema'

export const MyPrismaScalarsTypeUpdateManyArgsSchema: z.ZodType<Omit<Prisma.MyPrismaScalarsTypeUpdateManyArgs, "data"> & { where?: z.infer<typeof MyPrismaScalarsTypeWhereInputSchema>  }> = z.object({
  data: z.union([ MyPrismaScalarsTypeUpdateManyMutationInputSchema,MyPrismaScalarsTypeUncheckedUpdateManyInputSchema ]),
  where: MyPrismaScalarsTypeWhereInputSchema.optional(),
}).strict()

export default MyPrismaScalarsTypeUpdateManyArgsSchema
