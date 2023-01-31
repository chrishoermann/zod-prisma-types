import { Prisma } from '@prisma/client';
import {
  DecimalListSchema,
  DecimalSchema,
  DECIMAL_STRING_REGEX,
  isValidDecimalInput,
} from './implementations/decimalSchema';
import { client } from './trpc/client';
import { getServer } from './trpc/server';
import Decimal from 'decimal.js';
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
// HELPERS
///////////////////////////////////////

const isDecimalJsLike = (v: any): v is DecimalJsLike => {
  return !!v && 'd' in v && 'e' in v && 's' in v;
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
// REGEX
///////////////////////////////////////

it('should check validity of strings as decimal', () => {
  expect(
    DECIMAL_STRING_REGEX.test(
      '5032485723458348569331745.33434346346912144534543',
    ),
  ).toBe(true);
  expect(DECIMAL_STRING_REGEX.test('4.321e+4')).toBe(true);
  expect(DECIMAL_STRING_REGEX.test('-735.0918e-430')).toBe(true);
  expect(DECIMAL_STRING_REGEX.test('5.6700000')).toBe(true);
  expect(DECIMAL_STRING_REGEX.test('Infinity')).toBe(true);
  expect(DECIMAL_STRING_REGEX.test('NaN')).toBe(true);
  expect(DECIMAL_STRING_REGEX.test('.5')).toBe(true);
  expect(DECIMAL_STRING_REGEX.test('-0b10110100.1')).toBe(true);
  expect(DECIMAL_STRING_REGEX.test('0xff.8')).toBe(true);
  expect(DECIMAL_STRING_REGEX.test('468.75e-4')).toBe(true);
  expect(DECIMAL_STRING_REGEX.test('0b0.000011')).toBe(true);
  expect(DECIMAL_STRING_REGEX.test('0o0.03')).toBe(true);
  expect(DECIMAL_STRING_REGEX.test('0x0.0c')).toBe(true);
  expect(DECIMAL_STRING_REGEX.test('0b1.1p-5')).toBe(true);
  expect(DECIMAL_STRING_REGEX.test('0o1.4p-5')).toBe(true);
  expect(DECIMAL_STRING_REGEX.test('0x1.8p-5')).toBe(true);
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

it('should be a valid input when a prisma decimal is provided to "isValidDecimalInput"', () => {
  expect(isValidDecimalInput(new Prisma.Decimal(1.1))).toBe(true);
});

it('should be a valid input when a decimalJSLike is provided to "isValidDecimalInput"', () => {
  expect(isValidDecimalInput(decimalJsLikeTwo)).toBe(true);
});

// DecimalSchema
// ------------------------------------

it('should be able to use prisma decimal as input in DecimalSchema', () => {
  const parsedDecimal = DecimalSchema.parse(new Prisma.Decimal(1.1));
  expect(Prisma.Decimal.isDecimal(parsedDecimal)).toBe(true);
});

it('should be able to use string as input in DecimalSchema', () => {
  const parsedDecimal = DecimalSchema.parse('4.321e+4');
  expect(parsedDecimal).toBe('4.321e+4');
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
  expect(parsedDecimal).toBe(-1.2);
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
  expect(parsedDecimals).toEqual(['0.123', '4.321e+4']);
});

it('should be able to use numbers as input in DecimalListSchema', () => {
  const parsedDecimals = DecimalListSchema.parse([0.123, 4.321e4]);
  expect(parsedDecimals).toEqual([0.123, 4.321e4]);
});

///////////////////////////////////////
// TEST TRPC
///////////////////////////////////////

it('should be able to pass a decimal via trpc with DecimalModelSchema', async () => {
  const result = await client.decimal.query({
    id: 1,
    decimal: new Prisma.Decimal(1.16511),
    decimalOpt: new Prisma.Decimal(1.16511),
  });

  expect(result.isDecimal).toBe(true);
  expect(result.isDecimalOpt).toBe(true);
});

it('should be able to pass a string via trpc with DecimalModelSchema', async () => {
  const result = await client.decimal.query({
    id: 1,
    decimal: '1.16511',
    decimalOpt: '1.16511',
  });

  expect(result.isDecimal).toBe(true);
  expect(result.isDecimalOpt).toBe(true);
});

it('should be able to pass a number via trpc with DecimalModelSchema', async () => {
  const result = await client.decimal.query({
    id: 1,
    decimal: 1.16511,
    decimalOpt: 1.16511,
  });

  expect(result.isDecimal).toBe(true);
  expect(result.isDecimalOpt).toBe(true);
});

it('should throw when passing an invalid string to decimal via trpc', async () => {
  await expect(
    client.decimal.query({
      id: 1,
      decimal: 'qsdgast',
      decimalOpt: 'asdgatse',
    }),
  ).rejects.toThrow();
});

// LIST
// ----------------------------------------------

it('should be able to pass a prisma decimal via trpc with DecimalModelSchema', async () => {
  const data = {
    in: [new Prisma.Decimal(1.16511), new Prisma.Decimal(1.512345)],
    notIn: [new Prisma.Decimal(1.16511), new Prisma.Decimal(1.512345)],
  };
  const result = await client.decimalList.query(data);

  expect(result.isDecimalIn).toBe(true);
  expect(result.isDecimalNotIn).toBe(true);
});

it('should be able to pass a decimal via trpc with DecimalModelSchema', async () => {
  const data = {
    in: [new Decimal(1.16511), new Decimal(1.512345)],
    notIn: [new Decimal(1.16511), new Decimal(1.512345)],
  };
  const result = await client.decimalList.query(data);

  expect(result.isDecimalIn).toBe(true);
  expect(result.isDecimalNotIn).toBe(true);
});

it('should be able to pass a decimalLike via trpc with DecimalModelSchema', async () => {
  const data = {
    in: [decimalJsLikeOne, decimalJsLikeTwo],
    notIn: [decimalJsLikeOne, decimalJsLikeTwo],
  };
  const result = await client.decimalList.query(data);

  expect(result.isDecimalIn).toBe(true);
  expect(result.isDecimalNotIn).toBe(true);
});

it('should be able to pass a string via trpc with DecimalModelSchema', async () => {
  const data = {
    in: ['1.16511', '1.165111341'],
    notIn: ['1.16511', '1.165111341'],
  };
  const result = await client.decimalList.query(data);

  expect(result.isDecimalIn).toBe(true);
  expect(result.isDecimalNotIn).toBe(true);
});

it('should be able to pass a number via trpc with DecimalModelSchema', async () => {
  const data = {
    in: [1.16511, 1.165111341],
    notIn: [1.16511, 1.165111341],
  };
  const result = await client.decimalList.query(data);

  expect(result.isDecimalIn).toBe(true);
  expect(result.isDecimalNotIn).toBe(true);
});

it('should throw when passing an invalid string array to decimal via trpc', async () => {
  await expect(
    client.decimalList.query({
      in: ['qsdgast', 'asdgaser'],
      notIn: ['asdgatse', 'oasdgo'],
    }),
  ).rejects.toThrow();
});
