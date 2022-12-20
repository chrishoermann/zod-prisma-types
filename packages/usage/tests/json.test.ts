import { Prisma, PrismaClient } from '@prisma/client';
import {
  JsonModelCreateInputSchema,
  JsonModelSchema,
  JsonValue,
} from '../prisma/zod';

const JsonValueWithTransform = JsonValue.transform((v) => {
  if (v === null) return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  if (v === 'DbNull') return Prisma.DbNull;
  return v;
});

const prisma = new PrismaClient();

const transformJsonNull = (
  v?: Prisma.JsonValue | null | 'JsonNull' | 'DbNull',
) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

it('should return the right json null value', async () => {
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

  console.log('JsonModelSchema', parsedModel);
});

it('should return the right json null value', async () => {
  const parsedModel = JsonModelCreateInputSchema.parse({
    // id: 1,
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
});
