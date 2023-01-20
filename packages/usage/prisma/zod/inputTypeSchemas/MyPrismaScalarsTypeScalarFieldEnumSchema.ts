import { z } from 'zod'
import * as PrismaClient from '@prisma/client'

export const MyPrismaScalarsTypeScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.MyPrismaScalarsTypeScalarFieldEnum)

export default MyPrismaScalarsTypeScalarFieldEnumSchema
