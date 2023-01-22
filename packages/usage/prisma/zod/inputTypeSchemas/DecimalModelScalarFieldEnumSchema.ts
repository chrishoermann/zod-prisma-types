import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const DecimalModelScalarFieldEnumSchema = z.nativeEnum(Prisma.DecimalModelScalarFieldEnum)

export type DecimalModelScalarFieldEnumType = `z.infer<typeof DecimalModelScalarFieldEnumSchema>`

export default DecimalModelScalarFieldEnumSchema
