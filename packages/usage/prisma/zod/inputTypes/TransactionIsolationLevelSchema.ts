import { z } from 'zod'
import * as PrismaClient from '@prisma/client'

export const TransactionIsolationLevelSchema = z.nativeEnum(PrismaClient.Prisma.TransactionIsolationLevel)
