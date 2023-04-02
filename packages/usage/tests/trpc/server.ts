import { Decimal, DecimalJsLike } from '@prisma/client/runtime';
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import {
  DateModelSchema,
  DecimalModelSchema,
  DecimalNullableFilterSchema,
  JsonModelSchema,
  isValidDecimalInput,
} from '../../prisma/generated/zod';

export type AppRouter = typeof appRouter;

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;

// tests rely on the schema.prisma in the prisma folder
// the zod schemas need to be generated to complete the tests

///////////////////////////////////////
// PROCEDURES
///////////////////////////////////////

// DECIMAL
// -----------------------------------

const decimal = publicProcedure.input(DecimalModelSchema).query(({ input }) => {
  console.log(input.decimal);

  const isDecimal = isValidDecimalInput(input.decimal);
  const isDecimalOpt = isValidDecimalInput(input.decimalOpt);
  return { isDecimal, isDecimalOpt };
});

const decimalList = publicProcedure
  .input(DecimalNullableFilterSchema)
  .query(({ input }) => {
    const isDecimalIn = (input.in as any[]).every(
      (i: string | number | Decimal | DecimalJsLike | null | undefined) =>
        isValidDecimalInput(i),
    ) as boolean;
    const isDecimalNotIn = (input.notIn as any).every(
      (i: string | number | Decimal | DecimalJsLike | null | undefined) =>
        isValidDecimalInput(i),
    ) as boolean;
    return { isDecimalIn, isDecimalNotIn };
  });

// JSON
// -----------------------------------

const json = publicProcedure.input(JsonModelSchema).query(({ input }) => {
  const jsonIsObject = input.json instanceof Object;
  const jsonOptIsObject = input.jsonOpt instanceof Object;
  return { jsonIsObject, jsonOptIsObject };
});

// DATE
// -----------------------------------

const date = publicProcedure.input(DateModelSchema).query(({ input }) => {
  const dateIsDateInput = input.date instanceof Date;
  const dateOptIsDateInput = input.dateOpt instanceof Date;
  return { dateIsDateInput, dateOptIsDateInput };
});

///////////////////////////////////////
// ROUTER
///////////////////////////////////////

const appRouter = router({
  decimal,
  decimalList,
  json,
  date,
});

///////////////////////////////////////
// SERVER
///////////////////////////////////////

export const getServer = () => {
  return createHTTPServer({
    router: appRouter,
    createContext() {
      return {};
    },
  });
};
