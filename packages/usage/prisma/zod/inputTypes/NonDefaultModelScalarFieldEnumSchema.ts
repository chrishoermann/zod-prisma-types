import { z } from 'zod'
import * as PrismaClient from '@prisma/client'

export const NonDefaultModelScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.NonDefaultModelScalarFieldEnum)
