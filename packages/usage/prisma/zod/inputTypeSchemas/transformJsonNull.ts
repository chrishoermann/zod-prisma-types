import * as PrismaClient from '@prisma/client'

export type NullableJsonInput = PrismaClient.Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | PrismaClient.Prisma.NullTypes.DbNull | PrismaClient.Prisma.NullTypes.JsonNull

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return PrismaClient.Prisma.DbNull;
  if (v === 'JsonNull') return PrismaClient.Prisma.JsonNull;
  return v;
}

export default transformJsonNull
