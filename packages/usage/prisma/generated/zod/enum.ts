import * as Prisma from '@prisma/client';
import { z } from 'zod';

/////////////////////////////////////////
// ANOTHER ENUM ENUM
/////////////////////////////////////////

z.string().min(5, { message: 'Must be 5 or more characters long' });
z.string().max(5, { message: 'Must be 5 or fewer characters long' });
z.string().length(5, { message: 'Must be exactly 5 characters long' });
z.string().email({ message: 'Invalid email address' });
z.string().url({ message: 'Invalid url' });
z.string().uuid({ message: 'Invalid UUID' });
z.string().cuid();
z.string().startsWith('https://', { message: 'Must provide secure URL' });
z.string().endsWith('.com', { message: 'Only .com domains allowed' });

z.number().gt(5, { message: 'Must be greater than 5' });

// z.string().datetime({ message: 'Invalid datetime string! Must be UTC.' });

export const AnotherEnumType = z.nativeEnum(Prisma.AnotherEnum);

// ANOTHER ENUM - ENUM FILTER
//------------------------------------------------------

export const EnumAnotherEnumFilterType = z.object({
  equals: z.lazy(() => AnotherEnumType).optional(),
  in: z
    .union([
      z.lazy(() => AnotherEnumType),
      z.array(z.lazy(() => AnotherEnumType)),
    ])
    .optional(),
  notIn: z
    .union([
      z.lazy(() => AnotherEnumType),
      z.array(z.lazy(() => AnotherEnumType)),
    ])
    .optional(),
  not: z
    .union([
      z.lazy(() => NestedEnumAnotherEnumFilterType),
      z.lazy(() => AnotherEnumType),
    ])
    .optional(),
});

export const NestedEnumAnotherEnumFilterType: z.ZodType<Prisma.Prisma.NestedEnumAnotherEnumFilter> =
  z.object({
    equals: z.lazy(() => AnotherEnumType).optional(),
    in: z
      .union([
        z.lazy(() => AnotherEnumType),
        z.array(z.lazy(() => AnotherEnumType)),
      ])
      .optional(),
    notIn: z
      .union([
        z.lazy(() => AnotherEnumType),
        z.array(z.lazy(() => AnotherEnumType)),
      ])
      .optional(),
    not: z
      .union([
        z.lazy(() => NestedEnumAnotherEnumFilterType),
        z.lazy(() => AnotherEnumType),
      ])
      .optional(),
  });

// ANOTHER ENUM - ENUM LIST FILTER
//------------------------------------------------------

export const EnumAnotherEnumNullableListFilterType = z.object({
  equals: z
    .union([
      z.lazy(() => AnotherEnumType),
      z.array(z.lazy(() => AnotherEnumType)),
      z.null(),
    ])
    .optional(),
  has: z.union([z.lazy(() => AnotherEnumType), z.null()]).optional(),
  hasEvery: z
    .union([
      z.lazy(() => AnotherEnumType),
      z.array(z.lazy(() => AnotherEnumType)),
    ])
    .optional(),
  hasSome: z
    .union([
      z.lazy(() => AnotherEnumType),
      z.array(z.lazy(() => AnotherEnumType)),
    ])
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
  has: z.union([z.lazy(() => RoleType), z.null()]).optional(),
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
    .union([
      z.lazy(() => SecondEnumType),
      z.array(z.lazy(() => SecondEnumType)),
    ])
    .optional(),
  notIn: z
    .union([
      z.lazy(() => SecondEnumType),
      z.array(z.lazy(() => SecondEnumType)),
    ])
    .optional(),
  not: z
    .union([
      z.lazy(() => NestedEnumSecondEnumFilterType),
      z.lazy(() => SecondEnumType),
    ])
    .optional(),
});

export const NestedEnumSecondEnumFilterType: z.ZodType<Prisma.Prisma.NestedEnumSecondEnumFilter> =
  z.object({
    equals: z.lazy(() => SecondEnumType).optional(),
    in: z
      .union([
        z.lazy(() => SecondEnumType),
        z.array(z.lazy(() => SecondEnumType)),
      ])
      .optional(),
    notIn: z
      .union([
        z.lazy(() => SecondEnumType),
        z.array(z.lazy(() => SecondEnumType)),
      ])
      .optional(),
    not: z
      .union([
        z.lazy(() => NestedEnumSecondEnumFilterType),
        z.lazy(() => SecondEnumType),
      ])
      .optional(),
  });
