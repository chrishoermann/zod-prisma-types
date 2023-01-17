import { Prisma } from '@prisma/client';
import { decimalSchema } from './schemas/decimalSchema';
import { client } from './trpc/client';
import { getServer } from './trpc/server';
import Decimal from 'decimal.js';

const httpServer = getServer();

beforeAll(() => {
  httpServer.listen(2022);
});

afterAll(() => {
  httpServer.server.close();
});

it('should be able to use decimal', () => {
  const parsedDecimal = decimalSchema.parse(new Prisma.Decimal(1.1));
  expect(Prisma.Decimal.isDecimal(parsedDecimal)).toBe(true);
});

it('should be able to pass a decimal via trpc', async () => {
  expect(await client.decimal.query(new Decimal(1.16511))).toBe(true);
});

it('should be able to pass a Prisma decimal via trpc', async () => {
  expect(await client.decimal.query(new Prisma.Decimal(1.16511))).toBe(true);
});

it('should be able to pass a string to decimal via trpc', async () => {
  expect(await client.decimal.query('1.16511')).toBe(true);
});

it('should be able to pass number to decimal via trpc', async () => {
  expect(await client.decimal.query(1.16511)).toBe(true);
});

it('should throw when passing an invalid object to decimal via trpc', async () => {
  await expect(client.decimal.query({})).rejects.toThrow();
});

it('should throw when passing an invalid string to decimal via trpc', async () => {
  await expect(client.decimal.query('1.16511a')).rejects.toThrow();
});

it('should throw when passing an invalid boolean to decimal via trpc', async () => {
  await expect(client.decimal.query(true)).rejects.toThrow();
});

it('should be able to pass a decimal via trpc with DecimalModelSchema', async () => {
  const result = await client.decimalModel.query({
    id: 1,
    decimal: new Prisma.Decimal(1.16511),
    decimalOpt: new Prisma.Decimal(1.16511),
  });

  expect(result.isDecimal).toBe(true);
  expect(result.isDecimalOpt).toBe(true);
});

it('should be able to pass a string via trpc with DecimalModelSchema', async () => {
  const result = await client.decimalModel.query({
    id: 1,
    decimal: '1.16511',
    decimalOpt: '1.16511',
  });

  expect(result.isDecimal).toBe(true);
  expect(result.isDecimalOpt).toBe(true);
});

it('should be able to pass a number via trpc with DecimalModelSchema', async () => {
  const result = await client.decimalModel.query({
    id: 1,
    decimal: 1.16511,
    decimalOpt: 1.16511,
  });

  expect(result.isDecimal).toBe(true);
  expect(result.isDecimalOpt).toBe(true);
});

it('should throw when passing an invalid object to decimal via trpc', async () => {
  await expect(
    client.decimalModel.query({
      id: 1,
      decimal: {},
      decimalOpt: {},
    }),
  ).rejects.toThrow();
});

it('should throw when passing an invalid string to decimal via trpc', async () => {
  await expect(
    client.decimalModel.query({
      id: 1,
      decimal: 'qsdgast',
      decimalOpt: 'asdgatse',
    }),
  ).rejects.toThrow();
});

it('should throw when passing an invalid boolean to decimal via trpc', async () => {
  await expect(
    client.decimalModel.query({
      id: 1,
      decimal: true,
      decimalOpt: true,
    }),
  ).rejects.toThrow();
});
