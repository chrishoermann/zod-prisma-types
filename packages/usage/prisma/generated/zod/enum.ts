import * as Prisma from "@prisma/client";
import { z } from "zod";

/////////////////////////////////////////
// ANOTHER ENUM ENUM
/////////////////////////////////////////

export const AnotherEnumType = z.nativeEnum(Prisma.AnotherEnum);

// ANOTHER ENUM - ENUM FILTER
//------------------------------------------------------

export const EnumAnotherEnumFilterType = z.object({
  equals: z.lazy(() => AnotherEnumType).optional(),
  in: z
    .union([z.lazy(() => AnotherEnumType), z.array(z.lazy(() => AnotherEnumType))])
    .optional(),
  notIn: z
    .union([z.lazy(() => AnotherEnumType), z.array(z.lazy(() => AnotherEnumType))])
    .optional(),
  not: z
    .union([z.lazy(() => NestedEnumAnotherEnumFilterType), z.lazy(() => AnotherEnumType)])
    .optional(),
});

export const NestedEnumAnotherEnumFilterType: z.ZodType<Prisma.Prisma.NestedEnumAnotherEnumFilter> = z.object({
  equals: z.lazy(() => AnotherEnumType).optional(),
  in: z
    .union([z.lazy(() => AnotherEnumType), z.array(z.lazy(() => AnotherEnumType))])
    .optional(),
  notIn: z
    .union([z.lazy(() => AnotherEnumType), z.array(z.lazy(() => AnotherEnumType))])
    .optional(),
  not: z
    .union([z.lazy(() => NestedEnumAnotherEnumFilterType), z.lazy(() => AnotherEnumType)])
    .optional(),
});

// ANOTHER ENUM - ENUM LIST FILTER
//------------------------------------------------------

export const EnumAnotherEnumNullableListFilterType = z.object({
  equals: z
    .union([z.lazy(() => AnotherEnumType), z.array(z.lazy(() => AnotherEnumType)), z.null()])
    .optional(),
  has: z
    .union([z.lazy(() => AnotherEnumType), z.null()])
    .optional(),
  hasEvery: z
    .union([z.lazy(() => AnotherEnumType), z.array(z.lazy(() => AnotherEnumType))])
    .optional(),
  hasSome: z
    .union([z.lazy(() => AnotherEnumType), z.array(z.lazy(() => AnotherEnumType))])
    .optional(),
  isEmpty: z.boolean().optional(),
});

/////////////////////////////////////////
// ROLE ENUM
/////////////////////////////////////////

export const RoleType = z.nativeEnum(Prisma.Role);

// ROLE - ENUM LIST FILTER
//------------------------------------------------------

export const EnumRoleNullableListFilterType = z.object({
  equals: z
    .union([z.lazy(() => RoleType), z.array(z.lazy(() => RoleType)), z.null()])
    .optional(),
  has: z
    .union([z.lazy(() => RoleType), z.null()])
    .optional(),
  hasEvery: z
    .union([z.lazy(() => RoleType), z.array(z.lazy(() => RoleType))])
    .optional(),
  hasSome: z
    .union([z.lazy(() => RoleType), z.array(z.lazy(() => RoleType))])
    .optional(),
  isEmpty: z.boolean().optional(),
});

/////////////////////////////////////////
// SECOND ENUM ENUM
/////////////////////////////////////////

export const SecondEnumType = z.nativeEnum(Prisma.SecondEnum);

// SECOND ENUM - ENUM FILTER
//------------------------------------------------------

export const EnumSecondEnumFilterType = z.object({
  equals: z.lazy(() => SecondEnumType).optional(),
  in: z
    .union([z.lazy(() => SecondEnumType), z.array(z.lazy(() => SecondEnumType))])
    .optional(),
  notIn: z
    .union([z.lazy(() => SecondEnumType), z.array(z.lazy(() => SecondEnumType))])
    .optional(),
  not: z
    .union([z.lazy(() => NestedEnumSecondEnumFilterType), z.lazy(() => SecondEnumType)])
    .optional(),
});

export const NestedEnumSecondEnumFilterType: z.ZodType<Prisma.Prisma.NestedEnumSecondEnumFilter> = z.object({
  equals: z.lazy(() => SecondEnumType).optional(),
  in: z
    .union([z.lazy(() => SecondEnumType), z.array(z.lazy(() => SecondEnumType))])
    .optional(),
  notIn: z
    .union([z.lazy(() => SecondEnumType), z.array(z.lazy(() => SecondEnumType))])
    .optional(),
  not: z
    .union([z.lazy(() => NestedEnumSecondEnumFilterType), z.lazy(() => SecondEnumType)])
    .optional(),
});
