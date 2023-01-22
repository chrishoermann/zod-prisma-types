import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { MyPrismaScalarsTypeSelectSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeSelectSchema'
import { MyPrismaScalarsTypeWhereInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeWhereInputSchema'
import { MyPrismaScalarsTypeOrderByWithRelationInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeOrderByWithRelationInputSchema'
import { MyPrismaScalarsTypeWhereUniqueInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeWhereUniqueInputSchema'

export const MyPrismaScalarsTypeAggregateArgsSchema: z.ZodType<Prisma.MyPrismaScalarsTypeAggregateArgs> = z.object({
  select: MyPrismaScalarsTypeSelectSchema.optional(),
  where: MyPrismaScalarsTypeWhereInputSchema.optional(),
  orderBy: z.union([ MyPrismaScalarsTypeOrderByWithRelationInputSchema.array(),MyPrismaScalarsTypeOrderByWithRelationInputSchema ]).optional(),
  cursor: MyPrismaScalarsTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default MyPrismaScalarsTypeAggregateArgsSchema
