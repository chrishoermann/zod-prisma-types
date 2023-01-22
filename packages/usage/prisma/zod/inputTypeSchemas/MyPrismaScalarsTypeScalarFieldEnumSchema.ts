import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const MyPrismaScalarsTypeScalarFieldEnumSchema = z.nativeEnum(Prisma.MyPrismaScalarsTypeScalarFieldEnum)

export type MyPrismaScalarsTypeScalarFieldEnumType = `z.infer<typeof MyPrismaScalarsTypeScalarFieldEnumSchema>`

export default MyPrismaScalarsTypeScalarFieldEnumSchema
