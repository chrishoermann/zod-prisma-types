import { JsonModel as JsonModelPrisma } from '@prisma/client';
import {
  JsonModel,
  JsonModelCreateInputSchema,
  JsonModelSchema,
} from '../prisma/generated/zod';
import { client } from './trpc/client';
import { getServer } from './trpc/server';

///////////////////////////////////////
// SETUP
///////////////////////////////////////

const httpServer = getServer();

beforeAll(() => {
  httpServer.listen(2022);
});

afterAll(() => {
  httpServer.server.close();
});

///////////////////////////////////////
// BASIC TESTS
///////////////////////////////////////

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

///////////////////////////////////////
// TRPC TESTS
///////////////////////////////////////

it('should be able to pass an object via trpc with JsonModelSchema', async () => {
  const data = {
    id: 1,
    json: { someKey: 'someValue' },
    jsonOpt: { someKey: 'someValue' },
  };

  const result = await client.json.query(data);

  expect(result.jsonIsObject).toBe(true);
  expect(result.jsonOptIsObject).toBe(true);
});

it('should be able to pass "JsonNull" via trpc with JsonModelSchema', async () => {
  const data = {
    id: 1,
    json: { someKey: 'someValue' },
    jsonOpt: 'JsonNull',
  };

  const result = await client.json.query(data);

  expect(result.jsonIsObject).toBe(true);
  expect(result.jsonOptIsObject).toBe(true);
});

it('should be able to pass "DbNull" via trpc with JsonModelSchema', async () => {
  const data = {
    id: 1,
    json: { someKey: 'someValue' },
    jsonOpt: 'DbNull',
  };

  const result = await client.json.query(data);

  expect(result.jsonIsObject).toBe(true);
  expect(result.jsonOptIsObject).toBe(true);
});

it('should throw when passing an invalid string array to decimal via trpc', async () => {
  await expect(
    client.decimalList.query({
      in: ['qsdgast', 'asdgaser'],
      notIn: ['asdgatse', 'oasdgo'],
    }),
  ).rejects.toThrow();
});

it('should throw when compared types are wrong', async () => {
  const a: JsonModelPrisma = { id: 1, json: {}, jsonOpt: null };
  const b: JsonModel = a;
  const c: JsonModelPrisma = b;

  const aParsed = JsonModelSchema.parse(a);

  console.log(aParsed);

  expect(c).toBe(a);
});

it('should throw when compared types are wrong', async () => {
  const a: JsonModelPrisma = { id: 1, json: null, jsonOpt: null };
  const b: JsonModel = a;
  const c: JsonModelPrisma = b;

  const aParsed = JsonModelSchema.parse(a);

  console.log(aParsed);

  expect(c).toBe(a);
});
