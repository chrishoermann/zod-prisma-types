import { DMMF } from '@prisma/generator-helper';
import { describe, it, expect } from 'vitest';

import { GeneratorConfig } from '../../../schemas';
import { ExtendedDMMFFieldDefaultValidators } from '../extendedDMMFFieldDefaultValidators';

export const DEFAULT_GENERATOR_CONFIG: GeneratorConfig = {
  useMultipleFiles: false,
  createInputTypes: true,
  createModelTypes: true,
  createOptionalDefaultValuesTypes: false,
  createRelationValuesTypes: false,
  addInputTypeValidation: true,
  useDefaultValidators: true,
  prismaClientPath: '@prisma/client',
  coerceDate: true,
  writeNullishInModelTypes: false,
  isMongoDb: false,
  inputTypePath: 'inputTypeSchemas',
  outputTypePath: 'outputTypeSchemas',
};

const FIELD_BASE: DMMF.Field = {
  kind: 'scalar',
  name: 'test',
  isRequired: true,
  isList: false,
  isUnique: false,
  isId: false,
  isReadOnly: false,
  type: 'String',
  dbNames: ['test'],
  isGenerated: false,
  isUpdatedAt: false,
  hasDefaultValue: false,
  default: undefined,
  relationToFields: undefined,
  relationOnDelete: undefined,
  relationName: undefined,
  documentation: undefined,
};

describe('testSimpleModelNoValidators', async () => {
  it(`should load a scalar DMMF.field ExtendedDMMFFieldDefaultValidator class without a default validator`, async () => {
    const field = new ExtendedDMMFFieldDefaultValidators(
      { ...FIELD_BASE },
      DEFAULT_GENERATOR_CONFIG,
      'Test',
    );

    expect(field).toBeDefined();
    expect(field.zodValidatorString).toBe(undefined);
  });

  it(`should load a scalar DMMF.field ExtendedDMMFFieldDefaultValidator class with cuid default validator`, async () => {
    const field = new ExtendedDMMFFieldDefaultValidators(
      {
        ...FIELD_BASE,
        default: { name: 'cuid', args: [] },
      },
      DEFAULT_GENERATOR_CONFIG,
      'Test',
    );

    expect(field).toBeDefined();
    expect(field.zodValidatorString).toBe('.cuid()');
  });

  it(`should load a scalar DMMF.field ExtendedDMMFFieldDefaultValidator class with uuid default validator`, async () => {
    const field = new ExtendedDMMFFieldDefaultValidators(
      {
        ...FIELD_BASE,
        default: { name: 'uuid', args: [] },
      },
      DEFAULT_GENERATOR_CONFIG,
      'Test',
    );

    expect(field).toBeDefined();
    expect(field.zodValidatorString).toBe('.uuid()');
  });

  it(`should load a scalar DMMF.field ExtendedDMMFFieldDefaultValidator class with Int default validator`, async () => {
    const field = new ExtendedDMMFFieldDefaultValidators(
      {
        ...FIELD_BASE,
        type: 'Int',
      },
      DEFAULT_GENERATOR_CONFIG,
      'Test',
    );

    expect(field).toBeDefined();
    expect(field.zodValidatorString).toBe('.int()');
  });
});
