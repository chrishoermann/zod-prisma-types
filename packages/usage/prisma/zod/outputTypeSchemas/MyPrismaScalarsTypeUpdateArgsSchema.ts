import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { MyPrismaScalarsTypeSelectSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeSelectSchema'
import { MyPrismaScalarsTypeUpdateInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeUpdateInputSchema'
import { MyPrismaScalarsTypeUncheckedUpdateInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeUncheckedUpdateInputSchema'
import { MyPrismaScalarsTypeWhereUniqueInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeWhereUniqueInputSchema'

export const MyPrismaScalarsTypeUpdateArgsSchema: z.ZodType<Omit<Prisma.MyPrismaScalarsTypeUpdateArgs, "data"> & { where: z.infer<typeof MyPrismaScalarsTypeWhereUniqueInputSchema>  }> = z.object({
  select: MyPrismaScalarsTypeSelectSchema.optional(),
  data: z.union([ MyPrismaScalarsTypeUpdateInputSchema,MyPrismaScalarsTypeUncheckedUpdateInputSchema ]),
  where: MyPrismaScalarsTypeWhereUniqueInputSchema,
}).strict()

export default MyPrismaScalarsTypeUpdateArgsSchema
