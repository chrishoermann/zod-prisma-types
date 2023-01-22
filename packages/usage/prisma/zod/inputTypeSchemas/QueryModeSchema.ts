import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const QueryModeSchema = z.nativeEnum(Prisma.QueryMode)

export type QueryModeType = `z.infer<typeof QueryModeSchema>`

export default QueryModeSchema
