import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const ModelWithCommentsScalarFieldEnumSchema = z.nativeEnum(Prisma.ModelWithCommentsScalarFieldEnum)

export type ModelWithCommentsScalarFieldEnumType = `z.infer<typeof ModelWithCommentsScalarFieldEnumSchema>`

export default ModelWithCommentsScalarFieldEnumSchema
