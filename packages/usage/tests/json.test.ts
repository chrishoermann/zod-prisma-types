// !!!!! prisma queries are left in place to check if typescript is happy with the generated types !!!!!

// import { PrismaClient } from '@prisma/client';
import { JsonModelCreateInputSchema, JsonModelSchema } from '../prisma/zod';
import { getServer } from './trpc/server';

// const prisma = new PrismaClient();

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

  // await prisma.jsonModel.create({
  //   data: parsedModel,
  // });

  console.log('DbNull provided', parsedModel);

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

  // await prisma.jsonModel.create({
  //   data: parsedModel,
  // });

  console.log('null provided', parsedModel);

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

  // await prisma.jsonModel.create({
  //   data: parsedModel,
  // });

  console.log('JsonNull provided', parsedModel);

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

  // await prisma.jsonModel.create({
  //   data: parsedModel,
  // });

  console.log('JsonModelCreateInputSchema', parsedModel);

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

  // await prisma.jsonModel.create({
  //   data: parsedModel,
  // });

  console.log('JsonModelCreateInputSchema', parsedModel);

  expect(parsedModel.jsonOpt).toBeTypeOf('object');
});
