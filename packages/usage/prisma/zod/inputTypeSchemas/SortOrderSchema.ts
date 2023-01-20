import { z } from 'zod'
import * as PrismaClient from '@prisma/client'

export const SortOrderSchema = z.nativeEnum(PrismaClient.Prisma.SortOrder)

export default SortOrderSchema
