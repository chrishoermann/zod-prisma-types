import { z } from 'zod'
import * as PrismaClient from '@prisma/client'

export const JsonModelScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.JsonModelScalarFieldEnum)
