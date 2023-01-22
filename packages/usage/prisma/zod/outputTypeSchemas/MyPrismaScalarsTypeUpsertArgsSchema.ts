import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { MyPrismaScalarsTypeSelectSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeSelectSchema'
import { MyPrismaScalarsTypeWhereUniqueInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeWhereUniqueInputSchema'
import { MyPrismaScalarsTypeCreateInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeCreateInputSchema'
import { MyPrismaScalarsTypeUncheckedCreateInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeUncheckedCreateInputSchema'
import { MyPrismaScalarsTypeUpdateInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeUpdateInputSchema'
import { MyPrismaScalarsTypeUncheckedUpdateInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeUncheckedUpdateInputSchema'

export const MyPrismaScalarsTypeUpsertArgsSchema: z.ZodType<Omit<Prisma.MyPrismaScalarsTypeUpsertArgs, "create" | "update"> & { where: z.infer<typeof MyPrismaScalarsTypeWhereUniqueInputSchema> , }> = z.object({
  select: MyPrismaScalarsTypeSelectSchema.optional(),
  where: MyPrismaScalarsTypeWhereUniqueInputSchema,
  create: z.union([ MyPrismaScalarsTypeCreateInputSchema,MyPrismaScalarsTypeUncheckedCreateInputSchema ]),
  update: z.union([ MyPrismaScalarsTypeUpdateInputSchema,MyPrismaScalarsTypeUncheckedUpdateInputSchema ]),
}).strict()

export default MyPrismaScalarsTypeUpsertArgsSchema
