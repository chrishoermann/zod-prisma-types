import { DMMF } from '@prisma/generator-helper';
import { it, expect, describe } from 'vitest';

import { DEFAULT_GENERATOR_CONFIG, MODEL_BASE } from '../setup';
import {
  ExtendedDMMFModelValidatorMatch,
  IMPORT_STATEMENT_REGEX_PATTERN,
} from '../../03_extendedDMMFModelValidatorMatch';
import { GeneratorConfig } from '../../../../schemas/generatorConfigSchema';

/////////////////////////////////////////////
// TEST SUITE
/////////////////////////////////////////////

export function testExtendedDMMFFieldValidatorMatch<
  T extends ExtendedDMMFModelValidatorMatch,
>(
  classConstructor: new (
    generatorConfig: GeneratorConfig,
    model: DMMF.Model,
  ) => T,
) {
  const getModel = (model?: Partial<DMMF.Model>) =>
    new classConstructor(DEFAULT_GENERATOR_CONFIG, {
      ...MODEL_BASE,
      ...model,
    });

  describe(`ExtendedDMMFModelValidatorMatch`, () => {
    it('should test the regex with a matching string', () => {
      expect(
        IMPORT_STATEMENT_REGEX_PATTERN.test(
          '@zod.import(["import { myFunction } from "../../../../utils/myFunction";"]).refine(v => v.title.length > 0).transform(...some stuff).strict().refine((data) => { return true }, { message: "error" })',
        ),
      ).toBe(true);
    });
  });

  describe(`ExtendedDMMFFieldValidatorPattern`, () => {
    it(`should load a class without docs`, async () => {
      const model = getModel();
      expect(model?.['_validatorMatch']).toBe(undefined);
      expect(model?.clearedDocumentation).toBe(undefined);
    });

    it(`should load a class with docs`, async () => {
      const model = getModel({ documentation: 'some text in docs' });
      expect(model?.['_validatorMatch']).toBeUndefined();
      expect(model?.clearedDocumentation).toBe('some text in docs');
      expect(model.documentation).toBe('some text in docs');
    });

    it(`should load a class with docs and validator`, async () => {
      const model = getModel({
        documentation:
          'some text in docs before @zod.import(["import { myFunction } from "../../../../utils/myFunction";"]).refine(v => v.title.length > 0).transform(...some stuff).strict().refine((data) => { return true }, { message: "error" }) some text after',
      });
      const match = model?.['_validatorMatch'];

      expect(match?.groups?.['validatorPattern']).toBe(
        '.import(["import { myFunction } from "../../../../utils/myFunction";"]).refine(v => v.title.length > 0).transform(...some stuff).strict().refine((data) => { return true }, { message: "error" })',
      );
    });
  });
}

/////////////////////////////////////////////
// TEST EXECUTION
/////////////////////////////////////////////

testExtendedDMMFFieldValidatorMatch(ExtendedDMMFModelValidatorMatch);
