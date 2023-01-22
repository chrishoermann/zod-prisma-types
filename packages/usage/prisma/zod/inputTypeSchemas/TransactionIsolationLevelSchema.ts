import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const TransactionIsolationLevelSchema = z.nativeEnum(Prisma.TransactionIsolationLevel)

export type TransactionIsolationLevelType = `z.infer<typeof TransactionIsolationLevelSchema>`

export default TransactionIsolationLevelSchema
