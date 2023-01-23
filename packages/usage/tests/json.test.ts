import {
  JsonModelCreateInputSchema,
  JsonModelSchema,
} from '../prisma/generated/zod';
import { getServer } from './trpc/server';

const httpServer = getServer();

beforeAll(() => {
  httpServer.listen(2022);
});

afterAll(() => {
  httpServer.server.close();
});

it('should return Prisma.DbNull json null value when "DbNull" is provided with ModelSchema', async () => {
  const parsedModel = JsonModelSchema.parse({
    id: 1,
    json: {
      a: 'b',
      c: 'd',
    },
    jsonOpt: 'DbNull',
  });

  expect(parsedModel.jsonOpt).toBeTypeOf('object');
});

it('should return Prisma.DbNull json null value when "null" is provided with ModelSchema', async () => {
  const parsedModel = JsonModelSchema.parse({
    id: 1,
    json: {
      a: 'b',
      c: 'd',
    },
    jsonOpt: null,
  });

  expect(parsedModel.jsonOpt).toBeTypeOf('object');
});

it('should return Prisma.JsonNull json null value when "JsonNull" is provided with ModelSchema', async () => {
  const parsedModel = JsonModelSchema.parse({
    id: 1,
    json: {
      a: 'b',
      c: 'd',
    },
    jsonOpt: 'JsonNull',
  });

  expect(parsedModel.jsonOpt).toBeTypeOf('object');
});

it('should return Prisma.DbNull json null value when "DbNull" is provided with CreateInputSchema', async () => {
  const parsedModel = JsonModelCreateInputSchema.parse({
    json: {
      a: 'b',
      c: 'd',
    },
    jsonOpt: 'DbNull',
  });

  expect(parsedModel.jsonOpt).toBeTypeOf('object');
});

it('should return Prisma.JsonNull json null value when "JsonNull" is provided with CreateInputSchema', async () => {
  const parsedModel = JsonModelCreateInputSchema.parse({
    json: {
      a: 'b',
      c: 'd',
    },
    jsonOpt: 'JsonNull',
  });

  expect(parsedModel.jsonOpt).toBeTypeOf('object');
});
