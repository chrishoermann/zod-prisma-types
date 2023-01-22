import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const MODELWithUpperCaseScalarFieldEnumSchema = z.nativeEnum(Prisma.MODELWithUpperCaseScalarFieldEnum)

export type MODELWithUpperCaseScalarFieldEnumType = `z.infer<typeof MODELWithUpperCaseScalarFieldEnumSchema>`

export default MODELWithUpperCaseScalarFieldEnumSchema
