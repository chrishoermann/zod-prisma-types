import { z } from "zod";
import * as PrismaClient from "@prisma/client";

/////////////////////////////////////////
// HELPER TYPES
/////////////////////////////////////////

// DECIMAL
//------------------------------------------------------

export interface DecimalJsLike {
    d: number[];
    e: number;
    s: number;
}

export const DECIMAL_STRING_REGEX = /^[0-9.,e+-bxffo_cp]+$|Infinity|NaN/;

export const DecimalJSLikeSchema = z.object({ d: z.array(z.number()), e: z.number(), s: z.number() });

export const isValidDecimalInput = (v?: null | string | number | PrismaClient.Prisma.Decimal | DecimalJsLike) => {
        if (!v) return false;
        return (
            (typeof v === 'object' && PrismaClient.Prisma.Decimal.isDecimal(v)) ||
            (typeof v === 'object' && 'd' in v && 'e' in v && 's' in v) ||
            (typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) ||
            typeof v === 'number'
        )
    };

// JSON
//------------------------------------------------------

export type NullableJsonInput = PrismaClient.Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | PrismaClient.Prisma.NullTypes.DbNull | PrismaClient.Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => 
    {
        if (!v || v === 'DbNull') return PrismaClient.Prisma.DbNull;
        if (v === 'JsonNull') return PrismaClient.Prisma.JsonNull;
        return v;
    };

export const JsonValue: z.ZodType<PrismaClient.Prisma.JsonValue> = z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.lazy(() => z.array(JsonValue)),
    z.lazy(() => z.record(JsonValue)),
    ]);

export const NullableJsonValue = z
    .union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])
    .nullable()
    .transform((v) => transformJsonNull(v));

export const InputJsonValue: z.ZodType<PrismaClient.Prisma.InputJsonValue> = z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.lazy(() => z.array(InputJsonValue.nullable())),
    z.lazy(() => z.record(InputJsonValue.nullable())),
    ]);
