import { z } from 'zod'
import { AnotherEnum } from '@prisma/client'

export const AnotherEnumSchema = z.nativeEnum(AnotherEnum)

export type AnotherEnumType = `${z.infer<typeof AnotherEnumSchema>}`

export default AnotherEnumSchema
