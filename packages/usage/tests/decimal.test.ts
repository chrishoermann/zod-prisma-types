import { Prisma } from '@prisma/client';
import {
  DecimalListSchema,
  DecimalSchema,
  DECIMAL_STRING_REGEX,
  isValidDecimalInput,
  isValidDecimalListInput,
} from './schemas/decimalSchema';
import { client } from './trpc/client';
import { getServer } from './trpc/server';
import Decimal from 'decimal.js';
import { isDecimalJsLike } from '../prisma/zod';
import { DecimalJsLike } from '@prisma/client/runtime';

///////////////////////////////////////
// CONSTANTS
///////////////////////////////////////

export const decimalJsLikeOne: DecimalJsLike = {
  d: [1230000], // array of digits
  e: -1, // exponent
  s: 1, // sign
};

export const decimalJsLikeTwo: DecimalJsLike = {
  d: [1234], // array of digits
  e: -1, // exponent
  s: 1, // sign
};

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

it('should match a string number to a decimal', () => {
  const match = DECIMAL_STRING_REGEX.test('0.123');
  expect(match).toBe(true);
});
it('should not match a string number with characters to a decimal', () => {
  const match = DECIMAL_STRING_REGEX.test('0.123a');
  expect(match).toBe(false);
});

///////////////////////////////////////
// TEST SCHEMA AND TYPEGUARDS
///////////////////////////////////////

// isValidDecimalInput
// ------------------------------------

it('should be a valid input when a number is provided to "isValidDecimalInput"', () => {
  expect(isValidDecimalInput(0.123)).toBe(true);
});

it('should be a valid input when a string is provided to "isValidDecimalInput"', () => {
  expect(isValidDecimalInput('0.123')).toBe(true);
});

it('should not be a valid input when an invalid string is provided to "isValidDecimalInput"', () => {
  expect(isValidDecimalInput('0.123vyx')).toBe(false);
});

it('should not be a valid input when a prisma decimal is provided to "isValidDecimalInput"', () => {
  expect(isValidDecimalInput(new Prisma.Decimal(1.1))).toBe(false);
});

it('should not be a valid input when a decimalJSLike is provided to "isValidDecimalInput"', () => {
  expect(isValidDecimalInput(decimalJsLikeTwo)).toBe(false);
});

it('should not be a valid input when a decimalJS instance is provided to "isValidDecimalInput"', () => {
  expect(isValidDecimalInput(new Decimal(1.2314))).toBe(false);
});

// isValidDecimalListInput
// ------------------------------------

it('should be a valid input when string is provided to "isValidDecimalListInput"', () => {
  expect(isValidDecimalListInput(['0.123', '4.321e+4'])).toBe(true);
});

it('should not be a valid input when invalid strings are provided to "isValidDecimalListInput"', () => {
  expect(isValidDecimalListInput(['0.123', '0.123vyx'])).toBe(false);
});

it('should be a valid input when numbers are provided to "isValidDecimalListInput"', () => {
  expect(isValidDecimalListInput([0.123, 4.321e4])).toBe(true);
});

it('should not be a valid input when prisma decimal is provided to "isValidDecimalListInput"', () => {
  expect(
    isValidDecimalListInput([
      new Prisma.Decimal(0.123),
      new Prisma.Decimal(4.321e4),
    ]),
  ).toBe(false);
});

it('should not be a valid input when decimalJs is provided to "isValidDecimalListInput"', () => {
  expect(
    isValidDecimalListInput([new Decimal(1.234), new Decimal(1.5321)]),
  ).toBe(false);
});

it('should not be a valid input when decimalJsLike instances are provided to "isValidDecimalListInput"', () => {
  expect(isValidDecimalListInput([decimalJsLikeOne, decimalJsLikeTwo])).toBe(
    false,
  );
});

// DecimalSchema
// ------------------------------------

it('should be able to use prisma decimal as input in DecimalSchema', () => {
  const parsedDecimal = DecimalSchema.parse(new Prisma.Decimal(1.1));
  expect(Prisma.Decimal.isDecimal(parsedDecimal)).toBe(true);
});

it('should be able to use string as input in DecimalSchema', () => {
  const parsedDecimal = DecimalSchema.parse('4.321e+4');
  expect(Prisma.Decimal.isDecimal(parsedDecimal)).toBe(true);
});

it('should not be able to use an invalid string as input in DecimalSchema', () => {
  try {
    DecimalSchema.parse('4.321e+4g');
  } catch (error) {
    expect(error).toBeTruthy();
  }
});

it('should be able to use number as input in DecimalSchema', () => {
  const parsedDecimal = DecimalSchema.parse(-1.2);
  expect(Prisma.Decimal.isDecimal(parsedDecimal)).toBe(true);
});

it('should be able to use decimalJS as input in DecimalSchema', () => {
  const parsedDecimal = DecimalSchema.parse(new Decimal(1.1));
  expect(isDecimalJsLike(parsedDecimal)).toBe(true);
});

it('should be able to use decimalJSLike as input in DecimalSchema', () => {
  const parsedDecimal = DecimalSchema.parse(decimalJsLikeOne);
  expect(isDecimalJsLike(parsedDecimal)).toBe(true);
});

// DecimalListSchema
// ------------------------------------
it('should be able to use prisma decimal as input in DecimalListSchema', () => {
  const parsedDecimals = DecimalListSchema.parse([
    new Prisma.Decimal(1.1),
    new Prisma.Decimal(1.123),
  ]);
  expect(Prisma.Decimal.isDecimal(parsedDecimals[0])).toBe(true);
  expect(Prisma.Decimal.isDecimal(parsedDecimals[1])).toBe(true);
});

it('should be able to use decimalJS as input in DecimalListSchema', () => {
  const parsedDecimals = DecimalListSchema.parse([
    new Decimal(1.1),
    new Decimal(1.123),
  ]);
  expect(isDecimalJsLike(parsedDecimals[0])).toBe(true);
  expect(isDecimalJsLike(parsedDecimals[1])).toBe(true);
});

it('should be able to use decimalJSLike as input in DecimalListSchema', () => {
  const parsedDecimals = DecimalListSchema.parse([
    decimalJsLikeOne,
    decimalJsLikeTwo,
  ]);
  expect(isDecimalJsLike(parsedDecimals[0])).toBe(true);
  expect(isDecimalJsLike(parsedDecimals[1])).toBe(true);
});

it('should not be able to use invalid strings as input in DecimalListSchema', () => {
  try {
    DecimalListSchema.parse(['0.123', '0.123vyx']);
  } catch (error) {
    expect(error).toBeTruthy();
  }
});

it('should be able to use strings as input in DecimalListSchema', () => {
  const parsedDecimals = DecimalListSchema.parse(['0.123', '4.321e+4']);
  expect(Prisma.Decimal.isDecimal(parsedDecimals[0])).toBe(true);
  expect(Prisma.Decimal.isDecimal(parsedDecimals[1])).toBe(true);
});

it('should be able to use numbers as input in DecimalListSchema', () => {
  const parsedDecimals = DecimalListSchema.parse([0.123, 4.321e4]);
  expect(Prisma.Decimal.isDecimal(parsedDecimals[0])).toBe(true);
  expect(Prisma.Decimal.isDecimal(parsedDecimals[1])).toBe(true);
});

///////////////////////////////////////
// TEST TRPC
///////////////////////////////////////

it('should be able to pass a decimalJS via trpc', async () => {
  expect(await client.decimal.query(new Decimal(1.16511))).toBe(true);
});

it('should be able to pass a decimalJSLike via trpc', async () => {
  expect(await client.decimal.query(decimalJsLikeOne)).toBe(true);
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

it('should throw when passing an invalid string to decimal via trpc', async () => {
  await expect(client.decimal.query('1.16511a')).rejects.toThrow();
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

it('should throw when passing an invalid string to decimal via trpc', async () => {
  await expect(
    client.decimalModel.query({
      id: 1,
      decimal: 'qsdgast',
      decimalOpt: 'asdgatse',
    }),
  ).rejects.toThrow();
});
