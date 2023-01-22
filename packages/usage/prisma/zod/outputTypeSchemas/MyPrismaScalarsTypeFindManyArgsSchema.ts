import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { MyPrismaScalarsTypeSelectSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeSelectSchema'
import { MyPrismaScalarsTypeWhereInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeWhereInputSchema'
import { MyPrismaScalarsTypeOrderByWithRelationInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeOrderByWithRelationInputSchema'
import { MyPrismaScalarsTypeWhereUniqueInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeWhereUniqueInputSchema'
import { MyPrismaScalarsTypeScalarFieldEnumSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeScalarFieldEnumSchema'

export const MyPrismaScalarsTypeFindManyArgsSchema: z.ZodType<Prisma.MyPrismaScalarsTypeFindManyArgs> = z.object({
  select: MyPrismaScalarsTypeSelectSchema.optional(),
  where: MyPrismaScalarsTypeWhereInputSchema.optional(),
  orderBy: z.union([ MyPrismaScalarsTypeOrderByWithRelationInputSchema.array(),MyPrismaScalarsTypeOrderByWithRelationInputSchema ]).optional(),
  cursor: MyPrismaScalarsTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: MyPrismaScalarsTypeScalarFieldEnumSchema.array().optional(),
}).strict()

export default MyPrismaScalarsTypeFindManyArgsSchema
