import type DMMF from '@prisma/dmmf';
import { it, expect, describe, afterAll } from 'vitest';

import { MODEL_BASE } from '../setup';
import { ExtendedDMMFModelCustomErrors } from '../../06_extendedDMMFModelCustomErrors';
import { globalConfig } from '../../../../config';
import { DEFAULT_GENERATOR_CONFIG } from '../../../../__tests__/setup';

/////////////////////////////////////////////
// TEST SUITE
/////////////////////////////////////////////

export function testExtendedDMMFModelCustomErrors<
  T extends ExtendedDMMFModelCustomErrors,
>(classConstructor: new (model: DMMF.Model) => T) {
  const getModel = (model?: Partial<DMMF.Model>) =>
    new classConstructor({
      ...MODEL_BASE,
      ...model,
    });

  if (!globalConfig.isInitialized()) {
    globalConfig.initialize(DEFAULT_GENERATOR_CONFIG);
  }

  afterAll(() => {
    if (globalConfig.isInitialized()) {
      globalConfig.reset();
    }
  });

  describe(`ExtendedDMMFModelCustomErrors`, () => {
    it(`should load a class without docs`, async () => {
      const model = getModel();
      expect(model?.['_validatorCustomError']).toBeUndefined();
      expect(model?.zodCustomErrors).toBeUndefined();
    });

    it(`should load a class with valid custom error messages`, async () => {
      const model = getModel({
        documentation:
          '@zod.error({ required_error: "error", invalid_type_error: "error" , description: "error"})',
      });
      expect(model?.['_validatorCustomError']).toBe(
        '({ required_error: "error", invalid_type_error: "error" , description: "error"})',
      );
      expect(model?.zodCustomErrors).toBe(
        '{ required_error: "error", invalid_type_error: "error" , description: "error"}',
      );
    });

    it(`should load a class with docs and invalid validator string`, async () => {
      expect(() =>
        getModel({
          documentation:
            '@zod.error({ required_error: "error", invalid_type_errrror: "error"})',
        }),
      ).toThrowError(
        "[@zod generator error]: Custom error key 'invalid_type_errrror' is not valid. Please check for typos! [Error Location]: Model: 'User'.",
      );
    });

    it(`should throw when multiple error keys are used`, async () => {
      expect(() =>
        getModel({
          documentation:
            '@zod.error({ required_error: "error", invalid_type_errrror: "error"}).error({ required_error: "error", invalid_type_errrror: "error"})',
        }),
      ).toThrowError(
        "[@zod generator error]: Only one error message property can be set. [Error Location]: Model: 'User'.",
      );
    });
  });
}

/////////////////////////////////////////////
// TEST EXECUTION
/////////////////////////////////////////////

testExtendedDMMFModelCustomErrors(ExtendedDMMFModelCustomErrors);
