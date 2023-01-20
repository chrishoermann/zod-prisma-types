import { z } from 'zod'

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',])

export default JsonNullValueFilterSchema
