import { z } from 'zod'
import * as PrismaClient from '@prisma/client'

export const DecimalModelScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.DecimalModelScalarFieldEnum)

export default DecimalModelScalarFieldEnumSchema
