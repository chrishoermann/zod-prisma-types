import { z } from 'zod'

export const JsonNullValueInputSchema = z.enum(['JsonNull',])

export type JsonNullValueInputType = `z.infer<typeof JsonNullValueInputSchema>`

export default JsonNullValueInputSchema
