import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const JsonModelScalarFieldEnumSchema = z.nativeEnum(Prisma.JsonModelScalarFieldEnum)

export type JsonModelScalarFieldEnumType = `z.infer<typeof JsonModelScalarFieldEnumSchema>`

export default JsonModelScalarFieldEnumSchema
