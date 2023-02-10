import { it, expect } from 'vitest';

import { DEFAULT_GENERATOR_CONFIG, FIELD_BASE } from './setup';
import { ExtendedDMMFFieldBase } from '../extendedDMMFFieldBase';

it(`should load a scalar DMMF.field ExtendedDMMFFieldBase class with all its features`, async () => {
  const field = new ExtendedDMMFFieldBase(
    { ...FIELD_BASE },
    DEFAULT_GENERATOR_CONFIG,
    'Test',
  );

  expect(field.generatorConfig).toEqual(DEFAULT_GENERATOR_CONFIG);
  expect(field.modelName).toEqual('Test');
  expect(field).toBeDefined();
  expect(field.isNullable).toBe(false);
  expect(field.isJsonType).toBe(false);
  expect(field.isBytesType).toBe(false);
  expect(field.isDecimalType).toBe(false);
});

it(`should load a nullable DMMF.field ExtendedDMMFFieldBase class with all its features`, async () => {
  const field = new ExtendedDMMFFieldBase(
    { ...FIELD_BASE, isRequired: false },
    DEFAULT_GENERATOR_CONFIG,
    'Test',
  );

  expect(field.generatorConfig).toEqual(DEFAULT_GENERATOR_CONFIG);
  expect(field.modelName).toEqual('Test');
  expect(field).toBeDefined();
  expect(field.isNullable).toBe(true);
  expect(field.isJsonType).toBe(false);
  expect(field.isBytesType).toBe(false);
  expect(field.isDecimalType).toBe(false);
});

it(`should load a json DMMF.field ExtendedDMMFFieldBase class with all its features`, async () => {
  const field = new ExtendedDMMFFieldBase(
    { ...FIELD_BASE, type: 'Json' },
    DEFAULT_GENERATOR_CONFIG,
    'Test',
  );

  expect(field.generatorConfig).toEqual(DEFAULT_GENERATOR_CONFIG);
  expect(field.modelName).toEqual('Test');
  expect(field).toBeDefined();
  expect(field.isNullable).toBe(false);
  expect(field.isJsonType).toBe(true);
  expect(field.isBytesType).toBe(false);
  expect(field.isDecimalType).toBe(false);
});

it(`should load a bytes DMMF.field ExtendedDMMFFieldBase class with all its features`, async () => {
  const field = new ExtendedDMMFFieldBase(
    { ...FIELD_BASE, type: 'Bytes' },
    DEFAULT_GENERATOR_CONFIG,
    'Test',
  );

  expect(field.generatorConfig).toEqual(DEFAULT_GENERATOR_CONFIG);
  expect(field.modelName).toEqual('Test');
  expect(field).toBeDefined();
  expect(field.isNullable).toBe(false);
  expect(field.isJsonType).toBe(false);
  expect(field.isBytesType).toBe(true);
  expect(field.isDecimalType).toBe(false);
});

it(`should load a decimal DMMF.field ExtendedDMMFFieldBase class with all its features`, async () => {
  const field = new ExtendedDMMFFieldBase(
    { ...FIELD_BASE, type: 'Decimal' },
    DEFAULT_GENERATOR_CONFIG,
    'Test',
  );

  expect(field.generatorConfig).toEqual(DEFAULT_GENERATOR_CONFIG);
  expect(field.modelName).toEqual('Test');
  expect(field).toBeDefined();
  expect(field.isNullable).toBe(false);
  expect(field.isJsonType).toBe(false);
  expect(field.isBytesType).toBe(false);
  expect(field.isDecimalType).toBe(true);
});
