import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const LocationScalarFieldEnumSchema = z.nativeEnum(Prisma.LocationScalarFieldEnum)

export type LocationScalarFieldEnumType = `z.infer<typeof LocationScalarFieldEnumSchema>`

export default LocationScalarFieldEnumSchema
