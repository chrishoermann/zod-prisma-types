import { Decimal, DecimalJsLike } from '@prisma/client/runtime';
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { JsonModelSchema } from '../../prisma/generated/zod';
import {
  DecimalListModelSchema,
  DecimalModelSchema,
  DecimalSchema,
  isValidDecimalInput,
} from '../implementations/decimalSchema';

export type AppRouter = typeof appRouter;

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;

// tests rely on the schema.prisma in the prisma folder
// the zod schemas need to be generated to complete the tests

const appRouter = router({
  decimal: publicProcedure.input(DecimalSchema).query(({ input }) => {
    const isDecimal = isValidDecimalInput(input);
    return isDecimal;
  }),
  decimalModel: publicProcedure.input(DecimalModelSchema).query(({ input }) => {
    const isDecimal = isValidDecimalInput(input.decimal);
    const isDecimalOpt = isValidDecimalInput(input.decimalOpt);
    return { isDecimal, isDecimalOpt };
  }),
  decimalListModel: publicProcedure
    .input(DecimalListModelSchema)
    .query(({ input }) => {
      const isDecimal = (input.decimal as any[]).every(
        (i: string | number | Decimal | DecimalJsLike | null | undefined) =>
          isValidDecimalInput(i),
      ) as boolean;
      const isDecimalOpt = (input.decimalOpt as any).every(
        (i: string | number | Decimal | DecimalJsLike | null | undefined) =>
          isValidDecimalInput(i),
      ) as boolean;
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
