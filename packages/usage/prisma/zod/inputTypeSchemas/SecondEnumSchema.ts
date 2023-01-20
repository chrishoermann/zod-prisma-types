import { z } from 'zod'
import { SecondEnum } from '@prisma/client'

export const SecondEnumSchema = z.nativeEnum(SecondEnum)

export default SecondEnumSchema
