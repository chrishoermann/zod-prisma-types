import { z } from "zod";
import * as PrismaClient from "@prisma/client";

/////////////////////////////////////////
// HELPER TYPES
/////////////////////////////////////////

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
