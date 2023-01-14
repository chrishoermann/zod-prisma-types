import { z } from 'zod'
import * as PrismaClient from '@prisma/client'

export const MODELWithUpperCaseScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.MODELWithUpperCaseScalarFieldEnum)
