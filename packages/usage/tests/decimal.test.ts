import { Prisma, PrismaClient } from '@prisma/client';
import { client } from './trpc/client';
import { getServer } from './trpc/server';
import Decimal from 'decimal.js';
import {
  DecimalModelCreateInputSchema,
  DecimalNullableFilterSchema,
  isValidDecimalInput,
  DecimalJsLikeSchema,
} from '../prisma/generated/zod';
import { DecimalJsLike } from '@prisma/client/runtime/library';
import { it, expect, beforeAll, afterAll } from 'vitest';
import { DECIMAL_STRING_REGEX } from '../prisma/generated/zod/inputTypeSchemas/isValidDecimalInput';

// const prismaClient = new PrismaClient();

///////////////////////////////////////
// CONSTANTS
///////////////////////////////////////

export const decimalJsLikeOne: DecimalJsLike = {
  d: [1230000], // array of digits
  e: -1, // exponent
  s: 1, // sign
  toFixed: () => '1230000',
};

export const decimalJsLikeTwo: DecimalJsLike = {
  d: [1234], // array of digits
  e: -1, // exponent
  s: 1, // sign
  toFixed: () => '1234',
};

// ///////////////////////////////////////
// // HELPERS
// ///////////////////////////////////////

const isDecimalJsLike = (v: any): v is DecimalJsLike => {
  return !!v && 'd' in v && 'e' in v && 's' in v && 'toFixed' in v;
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

  // Correct formats
  expect(DECIMAL_STRING_REGEX.test('123')).toBe(true); // Integer
  expect(DECIMAL_STRING_REGEX.test('-123')).toBe(true); // Negative Integer
  expect(DECIMAL_STRING_REGEX.test('123.456')).toBe(true); // Decimal
  expect(DECIMAL_STRING_REGEX.test('-123.456')).toBe(true); // Negative Decimal
  expect(DECIMAL_STRING_REGEX.test('0.123')).toBe(true); // Leading Zero
  expect(DECIMAL_STRING_REGEX.test('123e-4')).toBe(true); // Scientific Notation
  expect(DECIMAL_STRING_REGEX.test('123E+6')).toBe(true); // Scientific Notation with capital 'E'
  expect(DECIMAL_STRING_REGEX.test('-0b1101')).toBe(true); // Negative Binary
  expect(DECIMAL_STRING_REGEX.test('0o755')).toBe(true); // Octal
  expect(DECIMAL_STRING_REGEX.test('-0x1A9F')).toBe(true); // Negative Hexadecimal
  expect(DECIMAL_STRING_REGEX.test('0b1010.101')).toBe(true); // Binary with fractional part
  expect(DECIMAL_STRING_REGEX.test('0o12.345')).toBe(true); // Octal with fractional part
  expect(DECIMAL_STRING_REGEX.test('0xABC.DEF')).toBe(true); // Hexadecimal with fractional part
  expect(DECIMAL_STRING_REGEX.test('0x0.0p0')).toBe(true); // Hexadecimal with binary exponent

  // Incorrect formats
  expect(DECIMAL_STRING_REGEX.test('123.')).toBe(false); // Decimal point with no trailing digits
  expect(DECIMAL_STRING_REGEX.test('.')).toBe(false); // Just a decimal point
  expect(DECIMAL_STRING_REGEX.test('..')).toBe(false); // Multiple decimal points
  expect(DECIMAL_STRING_REGEX.test('0b2')).toBe(false); // Binary with invalid digit
  expect(DECIMAL_STRING_REGEX.test('0o8')).toBe(false); // Octal with invalid digit
  expect(DECIMAL_STRING_REGEX.test('0xG')).toBe(false); // Hexadecimal with invalid digit
  expect(DECIMAL_STRING_REGEX.test('1e')).toBe(false); // Incomplete scientific notation
  expect(DECIMAL_STRING_REGEX.test('e9')).toBe(false); // Scientific notation without base
  expect(DECIMAL_STRING_REGEX.test('123abc')).toBe(false); // Alphabetic characters in number
  expect(DECIMAL_STRING_REGEX.test('123.456.789')).toBe(false); // Multiple decimal points
  // expect(DECIMAL_STRING_REGEX.test('0b1010p+2')).toBe(false); // Binary with binary exponent (not allowed)
  expect(DECIMAL_STRING_REGEX.test('0x1.2p-')).toBe(false); // Incomplete binary exponent
  expect(DECIMAL_STRING_REGEX.test('--123')).toBe(false); // Multiple minus signs
  expect(DECIMAL_STRING_REGEX.test('++123')).toBe(false); // Multiple plus signs

  // Special cases
  expect(DECIMAL_STRING_REGEX.test('0')).toBe(true); // Zero
  expect(DECIMAL_STRING_REGEX.test('-0')).toBe(true); // Negative zero
  // expect(DECIMAL_STRING_REGEX.test('+0')).toBe(true); // Positive zero with explicit sign
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

// ///////////////////////////////////////
// // TEST SCHEMA AND TYPEGUARDS
// ///////////////////////////////////////

// isValidDecimalInput
// ------------------------------------

it('should be a valid input when a 0 as number is provided to "isValidDecimalInput"', () => {
  expect(isValidDecimalInput(0)).toBe(true);
});

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

// DecimalJSLikeSchema
// ------------------------------------

it('should be able to use decimalJSLike as input in DecimalSchema', () => {
  const parsedDecimal = DecimalJsLikeSchema.parse(decimalJsLikeOne);

  // Check deep equality for the properties excluding the function
  expect({
    d: parsedDecimal.d,
    e: parsedDecimal.e,
    s: parsedDecimal.s,
  }).toEqual({
    d: decimalJsLikeOne.d,
    e: decimalJsLikeOne.e,
    s: decimalJsLikeOne.s,
  });

  // Check the outcome of the function call
  expect(parsedDecimal.toFixed()).toBe(decimalJsLikeOne.toFixed());
});

// DecimalSchema
// ------------------------------------

it('should be able to use prisma decimal as input in DecimalSchema', () => {
  const prismaDecimal = new Prisma.Decimal(1.1);

  const parsedDecimal = DecimalModelCreateInputSchema.parse({
    decimal: prismaDecimal,
  });

  expect(parsedDecimal.decimal instanceof Prisma.Decimal).toBe(true);

  if (parsedDecimal.decimal instanceof Prisma.Decimal) {
    expect(parsedDecimal.decimal.toFixed()).toBe(prismaDecimal.toFixed());
  }
});

it('should be able to use decimalJS as input in DecimalSchema', () => {
  const decimal = new Decimal(1.1);

  const parsedDecimal = DecimalModelCreateInputSchema.parse({
    decimal: decimal,
  });

  expect(parsedDecimal.decimal instanceof Decimal).toBe(true);

  if (parsedDecimal.decimal instanceof Decimal) {
    expect(parsedDecimal.decimal.toFixed()).toBe(decimal.toFixed());
  }
});

it('should be able to use string as input in DecimalSchema', () => {
  const parsedDecimal = DecimalModelCreateInputSchema.parse({
    decimal: '4.321e+4',
  });

  expect(parsedDecimal.decimal).toBe('4.321e+4');
});

it('should not be able to use an invalid string as input in DecimalSchema', () => {
  try {
    const parsedDecimal = DecimalModelCreateInputSchema.parse({
      decimal: '4.321e+4g',
    });
  } catch (error) {
    expect(error).toBeTruthy();
  }
});

it('should be able to use number as input in DecimalSchema', () => {
  const parsedDecimal = DecimalModelCreateInputSchema.parse({
    decimal: -1.2,
  });
  expect(parsedDecimal.decimal).toBe(-1.2);
});

it('should be able to use decimalJSLike as input in DecimalSchema', () => {
  const parsedDecimal = DecimalModelCreateInputSchema.parse({
    decimal: decimalJsLikeOne,
  });

  expect(isDecimalJsLike(parsedDecimal.decimal)).toBe(true);
});

// DecimalListSchema
// ------------------------------------

it('should be able to use prisma decimal as input in DecimalListSchema', () => {
  const parsedDecimals = DecimalNullableFilterSchema.parse({
    in: [new Prisma.Decimal(1.1), new Prisma.Decimal(1.123)],
  });

  expect(parsedDecimals.in?.[0] instanceof Prisma.Decimal).toBe(true);
  expect(parsedDecimals.in?.[1] instanceof Prisma.Decimal).toBe(true);
});

it('should be able to use decimalJS as input in DecimalListSchema', () => {
  const parsedDecimals = DecimalNullableFilterSchema.parse({
    in: [new Decimal(1.1), new Decimal(1.123)],
  });

  expect(parsedDecimals.in?.[0] instanceof Decimal).toBe(true);
  expect(parsedDecimals.in?.[1] instanceof Decimal).toBe(true);
});

it('should be able to use decimalJSLike as input in DecimalListSchema', () => {
  const parsedDecimals = DecimalNullableFilterSchema.parse({
    in: [decimalJsLikeOne, decimalJsLikeTwo],
  });

  expect(isDecimalJsLike(parsedDecimals.in?.[0])).toBe(true);
  expect(isDecimalJsLike(parsedDecimals.in?.[1])).toBe(true);
});

it('should not be able to use invalid strings as input in DecimalListSchema', () => {
  try {
    DecimalNullableFilterSchema.parse({
      in: ['0.123', '0.123vyx'],
    });
  } catch (error) {
    expect(error).toBeTruthy();
  }
});

it('should be able to use strings as input in DecimalListSchema', () => {
  const parsedDecimals = DecimalNullableFilterSchema.parse({
    in: ['0.123', '4.321e+4'],
  });
  expect(parsedDecimals.in).toEqual(['0.123', '4.321e+4']);
});

it('should be able to use numbers as input in DecimalListSchema', () => {
  const parsedDecimals = DecimalNullableFilterSchema.parse({
    in: [0.123, 4.321e4],
  });
  expect(parsedDecimals.in).toEqual([0.123, 4.321e4]);
});

///////////////////////////////////////
// TEST TRPC
///////////////////////////////////////

it('should be able to pass a prisma decimal via trpc with DecimalModelSchema', async () => {
  const result = await client.decimal.query({
    decimal: new Prisma.Decimal(1.16511),
    decimalOpt: new Prisma.Decimal(1.16511),
  });

  expect(result.isDecimal).toBe(true);
  expect(result.isDecimalOpt).toBe(true);
});

it('should be able to pass a decimalJS via trpc with DecimalModelSchema', async () => {
  const result = await client.decimal.query({
    decimal: new Decimal(1.16511),
    decimalOpt: new Decimal(1.16511),
  });

  expect(result.isDecimal).toBe(true);
  expect(result.isDecimalOpt).toBe(true);
});

it("should NOT be able to pass a decimalJSLike via trpc with DecimalModelSchema since to fixed can't be serialized)", async () => {
  await expect(
    client.decimal.query({
      decimal: decimalJsLikeOne,
      decimalOpt: decimalJsLikeTwo,
    }),
  ).rejects.toThrow();
});

it('should be able to pass a string via trpc with DecimalModelSchema', async () => {
  const result = await client.decimal.query({
    decimal: '1.16511',
    decimalOpt: '1.16511',
  });

  expect(result.isDecimal).toBe(true);
  expect(result.isDecimalOpt).toBe(true);
});

it('should be able to pass a number via trpc with DecimalModelSchema', async () => {
  const result = await client.decimal.query({
    decimal: 1.16511,
    decimalOpt: 1.16511,
  });

  expect(result.isDecimal).toBe(true);
  expect(result.isDecimalOpt).toBe(true);
});

it('should throw when passing an invalid string to decimal via trpc', async () => {
  await expect(
    client.decimal.query({
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

it("should NOT be able to pass a decimalJSLike List via trpc with DecimalModelSchema since to fixed can't be serialized)", async () => {
  await expect(
    client.decimalList.query({
      in: [decimalJsLikeOne, decimalJsLikeTwo],
      notIn: [decimalJsLikeOne, decimalJsLikeTwo],
    }),
  ).rejects.toThrow();
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
