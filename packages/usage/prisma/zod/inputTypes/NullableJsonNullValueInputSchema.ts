import { z } from 'zod'
import { transformJsonNull } from '../utils'

export const NullableJsonNullValueInputSchema = z.enum([
'DbNull',
'JsonNull',
])
.transform((v) => transformJsonNull(v))