import {
  JsonModel as JsonModelPrisma,
  Prisma,
  PrismaClient,
} from '@prisma/client';
import {
  JsonModel,
  JsonModelCreateInputSchema,
  JsonModelSchema,
  JsonValueSchema,
  InputJsonValueSchema,
  JsonNullValueInputSchema,
  NullableJsonNullValueInputSchema,
} from '../prisma/generated/zod';
import { client } from './trpc/client';
import { getServer } from './trpc/server';

import { it, expect, describe, beforeAll, afterAll } from 'vitest';

///////////////////////////////////////
// JSON SCHEMA REFINED
///////////////////////////////////////

const prismaClient = new PrismaClient();

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

describe('Basic Schema tests', () => {
  const jsonData = {
    name: 'John',
    age: 30,
    isStudent: false,
    subjects: ['math', 'science'],
    address: null,
    arr: [1, 2, 3, { innerKey: 'innerValue' }],
    nullValue: null,
  };

  it('InputJsonValueSchema should be able to parse a JSON object', async () => {
    const parsed = InputJsonValueSchema.parse(jsonData);
    expect(parsed).toBeTypeOf('object');
  });

  it('JsonValueSchema should be able to parse a JSON object', async () => {
    const parsed = JsonValueSchema.parse(jsonData);
    expect(parsed).toBeTypeOf('object');
  });

  it('should be able to parse a DbNull and convert it to Prisma.DbNull', async () => {
    expect(JsonNullValueInputSchema.parse('JsonNull')).toBeTypeOf('object');
  });

  it('should be able to parse a JsonNull and convert it to Prisma.JsonNull', async () => {
    expect(NullableJsonNullValueInputSchema.parse('DbNull')).toBeTypeOf(
      'object',
    );
    expect(NullableJsonNullValueInputSchema.parse('JsonNull')).toBeTypeOf(
      'object',
    );
  });
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

it('should be able to pass null via trpc with JsonModelSchema', async () => {
  const data = {
    id: 1,
    json: { someKey: 'someValue' },
    jsonOpt: null,
  };

  const result = await client.json.query(data);

  expect(result.jsonIsObject).toBe(true);
  expect(result.jsonOptIsObject).toBe(false);
});

it('should be able to pass "DbNull" via trpc with JsonModelCreateInputSchema', async () => {
  const data = {
    json: { someKey: 'someValue' },
    jsonOpt: 'JsonNull',
  };

  const result = await client.jsonCreate.mutate(data);

  expect(result.jsonIsObject).toBe(true);
  expect(result.jsonOptIsObject).toBe(true);
});
it('should be able to pass "DbNull" via trpc with JsonModelCreateInputSchema', async () => {
  const data = {
    json: { someKey: 'someValue' },
    jsonOpt: 'DbNull',
  };

  const result = await client.jsonCreate.mutate(data);

  expect(result.jsonIsObject).toBe(true);
  expect(result.jsonOptIsObject).toBe(true);
});

it('should throw when compared types are wrong', async () => {
  const a: JsonModelPrisma = { id: 1, json: {}, jsonOpt: null };
  const b: JsonModel = a;
  const c: JsonModelPrisma = b;

  const aParsed = JsonModelSchema.parse(a);

  expect(c).toBe(a);
});

it('should throw when compared types are wrong', async () => {
  const a: JsonModelPrisma = { id: 1, json: null, jsonOpt: null };
  const b: JsonModel = a;
  const c: JsonModelPrisma = b;

  const aParsed = JsonModelSchema.parse(a);

  expect(c).toBe(a);
});
