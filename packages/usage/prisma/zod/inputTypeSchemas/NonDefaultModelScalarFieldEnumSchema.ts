import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const NonDefaultModelScalarFieldEnumSchema = z.nativeEnum(Prisma.NonDefaultModelScalarFieldEnum)

export type NonDefaultModelScalarFieldEnumType = `z.infer<typeof NonDefaultModelScalarFieldEnumSchema>`

export default NonDefaultModelScalarFieldEnumSchema
