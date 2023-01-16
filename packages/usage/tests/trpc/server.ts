import { Prisma } from '@prisma/client';
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { JsonModelSchema } from '../../prisma/zod';
import { DecimalModelSchema, decimalSchema } from '../schemas/decimalSchema';

export type AppRouter = typeof appRouter;

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;

// tests rely on the schema.prisma in the prisma folder
// the zod schemas need to be generated to complete the tests

const appRouter = router({
  decimal: publicProcedure.input(decimalSchema).query(({ input }) => {
    const isDecimal = Prisma.Decimal.isDecimal(input);
    return isDecimal;
  }),
  decimalModel: publicProcedure.input(DecimalModelSchema).query(({ input }) => {
    const isDecimal = Prisma.Decimal.isDecimal(input.decimal);
    const isDecimalOpt = Prisma.Decimal.isDecimal(input.decimalOpt);
    return { isDecimal, isDecimalOpt };
  }),
  json: publicProcedure.input(JsonModelSchema).query(({ input }) => {
    return input;
  }),
});

export const getServer = () => {
  return createHTTPServer({
    router: appRouter,
    createContext() {
      return {};
    },
  });
};
