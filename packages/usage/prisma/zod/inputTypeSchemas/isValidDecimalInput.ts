import { Prisma } from '@prisma/client'
import { DecimalJsLike } from '@prisma/client/runtime'

export const DECIMAL_STRING_REGEX = /^[0-9.,e+-bxffo_cp]+$|Infinity|NaN/

export const isValidDecimalInput =
  (v?: null | string | number | Prisma.Decimal | DecimalJsLike) =>
  {
    if (!v) return false;
    return (
    (typeof v === 'object' && Prisma.Decimal.isDecimal(v)) ||
    (typeof v === 'object' && 'd' in v && 'e' in v && 's' in v) ||
    (typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) ||
    typeof v === 'number'
    )
  }

export default isValidDecimalInput
