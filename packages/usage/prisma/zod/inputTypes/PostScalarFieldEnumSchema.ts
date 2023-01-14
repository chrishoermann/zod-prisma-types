import { z } from 'zod'
import * as PrismaClient from '@prisma/client'

export const PostScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.PostScalarFieldEnum)
