import * as Prisma from "@prisma/client";
import { z } from "zod";

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

// SORT ORDER
//------------------------------------------------------

export const SortOrder = z.nativeEnum(Prisma.Prisma.SortOrder);

// QUERY MODE
//------------------------------------------------------

export const QueryMode = z.nativeEnum(Prisma.Prisma.QueryMode);

/////////////////////////////////////////
// STRING FILTERS
/////////////////////////////////////////

// STRING FILTER
//------------------------------------------------------

export const StringFilter: z.ZodType<Prisma.Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([z.string(), z.string().array()]).optional(),
  notIn: z.union([z.string(), z.string().array()]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: QueryMode.optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringFilter)]).optional(),
});

// STRING NULLABLE FILTER
//------------------------------------------------------

export const StringNullableFilter: z.ZodType<Prisma.Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([z.string(), z.string().array()]).optional().nullable(),
  notIn: z.union([z.string(), z.string().array()]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: QueryMode.optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringNullableFilter)]).optional().nullable(),
});

// NESTED STRING FILTER
//------------------------------------------------------

export const NestedStringFilter: z.ZodType<Prisma.Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([z.string(), z.string().array()]).optional(),
  notIn: z.union([z.string(), z.string().array()]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringFilter)]).optional(),
});

// NESTED STRING NULLABLE FILTER
//------------------------------------------------------

export const NestedStringNullableFilter: z.ZodType<Prisma.Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([z.string(), z.string().array()]).optional().nullable(),
  notIn: z.union([z.string(), z.string().array()]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: QueryMode.optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringNullableFilter)]).optional().nullable(),
});

// STRING WITH AGGREGATES FILTER
//------------------------------------------------------

export const StringWithAggregatesFilter: z.ZodType<Prisma.Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([z.string(), z.string().array()]).optional(),
  notIn: z.union([z.string(), z.string().array()]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: QueryMode.optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _min: z.lazy(() => NestedStringFilter).optional(),
  _max: z.lazy(() => NestedStringFilter).optional(),
});

// STRING NULLABLE WITH AGGREGATES FILTER
//------------------------------------------------------

export const StringNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([z.string(), z.string().array()]).optional().nullable(),
  notIn: z.union([z.string(), z.string().array()]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: QueryMode.optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilter)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter).optional(),
  _min: z.lazy(() => NestedStringNullableFilter).optional(),
  _max: z.lazy(() => NestedStringNullableFilter).optional(),
});

// NESTED STRING WITH AGGREGATES FILTER
//------------------------------------------------------

export const NestedStringWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([z.string(), z.string().array()]).optional(),
  notIn: z.union([z.string(), z.string().array()]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _min: z.lazy(() => NestedStringFilter).optional(),
  _max: z.lazy(() => NestedStringFilter).optional(),
});

// NESTED STRING NULLABLE WITH AGGREGATES FILTER
//------------------------------------------------------

export const NestedStringNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([z.string(), z.string().array()]).optional().nullable(),
  notIn: z.union([z.string(), z.string().array()]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilter)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter).optional(),
  _min: z.lazy(() => NestedStringNullableFilter).optional(),
  _max: z.lazy(() => NestedStringNullableFilter).optional(),
});

/////////////////////////////////////////
// INT FILTERS
/////////////////////////////////////////

// INT FILTER
//------------------------------------------------------

type IntFilter = {
  equals?: number;
  in?: Prisma.Prisma.Enumerable<number>;
  notIn?: Prisma.Prisma.Enumerable<number>;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: NestedIntFilter | number;
};

export const IntFilter: z.ZodType<IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([z.number(), z.number().array()]).optional(),
  notIn: z.union([z.number(), z.number().array()]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilter)]).optional(),
});

// NESTED INT FILTER
//------------------------------------------------------

type NestedIntFilter = {
  equals?: number;
  in?: Prisma.Prisma.Enumerable<number>;
  notIn?: Prisma.Prisma.Enumerable<number>;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: NestedIntFilter | number;
};

export const NestedIntFilter: z.ZodType<NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([z.number(), z.number().array()]).optional(),
  notIn: z.union([z.number(), z.number().array()]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilter)]).optional(),
});

// INT WITH AGGREGATES FILTER
//------------------------------------------------------

type IntWithAggregatesFilter = {
  equals?: number;
  in?: Prisma.Prisma.Enumerable<number>;
  notIn?: Prisma.Prisma.Enumerable<number>;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: NestedIntWithAggregatesFilter | number;
  _count?: NestedIntFilter;
  _avg?: NestedFloatFilter;
  _sum?: NestedIntFilter;
  _min?: NestedIntFilter;
  _max?: NestedIntFilter;
};

export const IntWithAggregatesFilter: z.ZodType<IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([z.number(), z.number().array()]).optional(),
  notIn: z.union([z.number(), z.number().array()]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _avg: z.lazy(() => NestedFloatFilter).optional(),
  _sum: z.lazy(() => NestedIntFilter).optional(),
  _min: z.lazy(() => NestedIntFilter).optional(),
  _max: z.lazy(() => NestedIntFilter).optional(),
});

// NESTED INT WITH AGGREGATES FILTER
//------------------------------------------------------

type NestedIntWithAggregatesFilter = {
  equals?: number;
  in?: Prisma.Prisma.Enumerable<number>;
  notIn?: Prisma.Prisma.Enumerable<number>;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: NestedIntWithAggregatesFilter | number;
  _count?: NestedIntFilter;
  _avg?: NestedFloatFilter;
  _sum?: NestedIntFilter;
  _min?: NestedIntFilter;
  _max?: NestedIntFilter;
};

export const NestedIntWithAggregatesFilter: z.ZodType<NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([z.number(), z.number().array()]).optional(),
  notIn: z.union([z.number(), z.number().array()]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _avg: z.lazy(() => NestedFloatFilter).optional(),
  _sum: z.lazy(() => NestedIntFilter).optional(),
  _min: z.lazy(() => NestedIntFilter).optional(),
  _max: z.lazy(() => NestedIntFilter).optional(),
});

// INT NULLABLE FILTER
//------------------------------------------------------

type IntNullableFilter = {
  equals?: number | null;
  in?: Prisma.Prisma.Enumerable<number> | null;
  notIn?: Prisma.Prisma.Enumerable<number> | null;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: NestedIntFilter | number | null;
};

export const IntNullableFilter: z.ZodType<IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([z.number(), z.number().array()]).optional().nullable(),
  notIn: z.union([z.number(), z.number().array()]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilter)]).optional().nullable(),
});

// NESTED NULLABLE INT FILTER
//------------------------------------------------------

type NestedIntNullableFilter = {
  equals?: number | null;
  in?: Prisma.Prisma.Enumerable<number> | null;
  notIn?: Prisma.Prisma.Enumerable<number> | null;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: NestedIntFilter | number | null;
};

export const NestedIntNullableFilter: z.ZodType<NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([z.number(), z.number().array()]).optional().nullable(),
  notIn: z.union([z.number(), z.number().array()]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilter)]).optional().nullable(),
});

// INT NULLABLE WITH AGGREGATES FILTER
//------------------------------------------------------

type IntNullableWithAggregatesFilter = {
  equals?: number | null;
  in?: Prisma.Prisma.Enumerable<number> | null;
  notIn?: Prisma.Prisma.Enumerable<number> | null;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: NestedIntNullableWithAggregatesFilter | number | null;
  _count?: NestedIntNullableFilter;
  _avg?: NestedFloatNullableFilter;
  _sum?: NestedIntNullableFilter;
  _min?: NestedIntNullableFilter;
  _max?: NestedIntNullableFilter;
};

export const IntNullableWithAggregatesFilter: z.ZodType<IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([z.number(), z.number().array()]).optional().nullable(),
  notIn: z.union([z.number(), z.number().array()]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilter)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilter).optional(),
  _sum: z.lazy(() => NestedIntNullableFilter).optional(),
  _min: z.lazy(() => NestedIntNullableFilter).optional(),
  _max: z.lazy(() => NestedIntNullableFilter).optional(),
});

// NESTED INT NULLABLE WITH AGGREGATES FILTER
//------------------------------------------------------

type NestedIntNullableWithAggregatesFilter = {
  equals?: number | null;
  in?: Prisma.Prisma.Enumerable<number> | null;
  notIn?: Prisma.Prisma.Enumerable<number> | null;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: NestedIntNullableWithAggregatesFilter | number | null;
  _count?: NestedIntNullableFilter;
  _avg?: NestedFloatNullableFilter;
  _sum?: NestedIntNullableFilter;
  _min?: NestedIntNullableFilter;
  _max?: NestedIntNullableFilter;
};

export const NestedIntNullableWithAggregatesFilter: z.ZodType<NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([z.number(), z.number().array()]).optional().nullable(),
  notIn: z.union([z.number(), z.number().array()]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilter)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilter).optional(),
  _sum: z.lazy(() => NestedIntNullableFilter).optional(),
  _min: z.lazy(() => NestedIntNullableFilter).optional(),
  _max: z.lazy(() => NestedIntNullableFilter).optional(),
});

/////////////////////////////////////////
// FLOAT FILTERS
/////////////////////////////////////////

// FLOAT FILTER
//------------------------------------------------------

export const FloatFilter: z.ZodType<Prisma.Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([z.number(), z.number().array()]).optional(),
  notIn: z.union([z.number(), z.number().array()]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatFilter)]).optional(),
});

// FLOAT NULLABLE FILTER
//------------------------------------------------------

export const FloatNullableFilter: z.ZodType<Prisma.Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([z.number(), z.number().array()]).optional().nullable(),
  notIn: z.union([z.number(), z.number().array()]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatNullableFilter)]).optional().nullable(),
});

// NESTED FLOAT FILTER
//------------------------------------------------------

export const NestedFloatFilter: z.ZodType<Prisma.Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([z.number(), z.number().array()]).optional(),
  notIn: z.union([z.number(), z.number().array()]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatFilter)]).optional(),
});

export const NestedFloatNullableFilter: z.ZodType<Prisma.Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([z.number(), z.number().array()]).optional().nullable(),
  notIn: z.union([z.number(), z.number().array()]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatNullableFilter)]).optional().nullable(),
});
