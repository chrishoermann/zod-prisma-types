import { z } from 'zod'

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',])

export type JsonNullValueFilterType = `z.infer<typeof JsonNullValueFilterSchema>`

export default JsonNullValueFilterSchema
