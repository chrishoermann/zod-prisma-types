import { z } from 'zod'
import { SecondEnum } from '@prisma/client'

export const SecondEnumSchema = z.nativeEnum(SecondEnum)

export type SecondEnumType = `${z.infer<typeof SecondEnumSchema>}`

export default SecondEnumSchema
