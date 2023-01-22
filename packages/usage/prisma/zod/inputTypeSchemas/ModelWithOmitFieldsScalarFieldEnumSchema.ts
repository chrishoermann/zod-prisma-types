import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const ModelWithOmitFieldsScalarFieldEnumSchema = z.nativeEnum(Prisma.ModelWithOmitFieldsScalarFieldEnum)

export type ModelWithOmitFieldsScalarFieldEnumType = `z.infer<typeof ModelWithOmitFieldsScalarFieldEnumSchema>`

export default ModelWithOmitFieldsScalarFieldEnumSchema
