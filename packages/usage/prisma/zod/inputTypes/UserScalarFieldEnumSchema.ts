import { z } from 'zod'
import * as PrismaClient from '@prisma/client'

export const UserScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.UserScalarFieldEnum)
