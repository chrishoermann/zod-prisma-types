import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const SortOrderSchema = z.nativeEnum(Prisma.SortOrder)

export type SortOrderType = `z.infer<typeof SortOrderSchema>`

export default SortOrderSchema
