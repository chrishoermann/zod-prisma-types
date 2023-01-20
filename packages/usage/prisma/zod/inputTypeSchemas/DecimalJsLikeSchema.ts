import { z } from 'zod'

export const DecimalJSLikeSchema = z.object({ d: z.array(z.number()), e: z.number(), s: z.number() })

export default DecimalJSLikeSchema
