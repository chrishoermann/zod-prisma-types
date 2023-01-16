import { Prisma } from '@prisma/client';
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { DecimalModelSchema, decimalSchema } from '../schemas/decimalSchema';

export type AppRouter = typeof appRouter;

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  decimal: publicProcedure.input(decimalSchema).query(({ input }) => {
    const isDecimal = Prisma.Decimal.isDecimal(input);
    return isDecimal;
  }),
  decimalModel: publicProcedure.input(DecimalModelSchema).query(({ input }) => {
    try {
      const isDecimal = Prisma.Decimal.isDecimal(input.decimal);
      const isDecimalOpt = Prisma.Decimal.isDecimal(input.decimalOpt);
      return { isDecimal, isDecimalOpt };
    } catch (error) {
      throw new Error('something went wrong');
    }
  }),
});

export const startServer = () => {
  createHTTPServer({
    router: appRouter,
    createContext() {
      return {};
    },
  }).listen(2022);
};
