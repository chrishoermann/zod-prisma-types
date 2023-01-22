import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const WithDefaultValidatorsScalarFieldEnumSchema = z.nativeEnum(Prisma.WithDefaultValidatorsScalarFieldEnum)

export type WithDefaultValidatorsScalarFieldEnumType = `z.infer<typeof WithDefaultValidatorsScalarFieldEnumSchema>`

export default WithDefaultValidatorsScalarFieldEnumSchema
