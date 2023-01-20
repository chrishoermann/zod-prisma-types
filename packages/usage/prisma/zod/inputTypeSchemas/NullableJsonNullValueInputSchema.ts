import { z } from 'zod'
import transformJsonNull from './transformJsonNull'

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((v) => transformJsonNull(v))

export default NullableJsonNullValueInputSchema
