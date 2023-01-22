import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { MyPrismaScalarsTypeSelectSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeSelectSchema'
import { MyPrismaScalarsTypeWhereInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeWhereInputSchema'
import { MyPrismaScalarsTypeOrderByWithAggregationInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeOrderByWithAggregationInputSchema'
import { MyPrismaScalarsTypeScalarFieldEnumSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeScalarFieldEnumSchema'
import { MyPrismaScalarsTypeScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeScalarWhereWithAggregatesInputSchema'

export const MyPrismaScalarsTypeGroupByArgsSchema: z.ZodType<Prisma.MyPrismaScalarsTypeGroupByArgs> = z.object({
  select: MyPrismaScalarsTypeSelectSchema.optional(),
  where: MyPrismaScalarsTypeWhereInputSchema.optional(),
  orderBy: z.union([ MyPrismaScalarsTypeOrderByWithAggregationInputSchema.array(),MyPrismaScalarsTypeOrderByWithAggregationInputSchema ]).optional(),
  by: MyPrismaScalarsTypeScalarFieldEnumSchema.array(),
  having: MyPrismaScalarsTypeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default MyPrismaScalarsTypeGroupByArgsSchema
