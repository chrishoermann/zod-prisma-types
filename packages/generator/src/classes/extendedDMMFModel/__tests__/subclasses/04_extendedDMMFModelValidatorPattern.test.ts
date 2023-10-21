import { DMMF } from '@prisma/generator-helper';
import { it, expect, describe } from 'vitest';

import { DEFAULT_GENERATOR_CONFIG, MODEL_BASE } from '../setup';
import {
  ALLOWED_TYPES_REGEX_PATTERN,
  ExtendedDMMFModelValidatorPattern,
} from '../../04_extendedDMMFModelValidatorPattern';
import { GeneratorConfig } from '../../../../schemas/generatorConfigSchema';

/////////////////////////////////////////////
// TEST SUITE
/////////////////////////////////////////////

export function testExtendedDMMFFieldValidatorPattern<
  T extends ExtendedDMMFModelValidatorPattern,
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

  describe(`ExtendedDMMFFieldValidatorPattern`, () => {
    it(`should load a class with docs and validator`, async () => {
      const model = getModel({
        documentation:
          'some text in docs before @zod.import(["import { myFunction } from "../../../../utils/myFunction";"]).error({ invalid_type_error: "some stuff" }).refine(v => v.title.length > 0).transform(...some stuff).strict() some text after',
      });

      expect(model?.['_validatorList']).toEqual([
        '.import(["import { myFunction } from "../../../../utils/myFunction";"])',
        '.error({ invalid_type_error: "some stuff" })',
        '.refine(v => v.title.length > 0)',
        '.transform(...some stuff)',
        '.strict()',
      ]);
      expect(model?.clearedDocumentation).toBe(
        'some text in docs before some text after',
      );
      expect(model.documentation).toBe(
        'some text in docs before @zod.import(["import { myFunction } from "../../../../utils/myFunction";"]).error({ invalid_type_error: "some stuff" }).refine(v => v.title.length > 0).transform(...some stuff).strict() some text after',
      );
    });

    it("should not load a class with docs and validator if it doesn't match the regex", async () => {
      expect(() =>
        getModel({
          documentation:
            'some text in docs before @zod.improt(["import { myFunction } from "../../../../utils/myFunction";"]).refine(v => v.title.length > 0).transform(...some stuff).strict() some text after',
        }),
      ).toThrowError(
        `[@zod generator error]: 'improt' is not valid as validator. [Error Location]: Model: 'User'`,
      );
    });

    // New Test Case
    it('should match all the valid methods', async () => {
      const validMethods = [
        '.parse()',
        '.parseAsync()',
        '.safeParse()',
        '.safeParseAsync()',
        '.refine()',
        '.superRefine()',
        '.transform()',
        '.default()',
        '.describe()',
        '.catch()',
        '.optional()',
        '.nullable()',
        '.nullish()',
        '.array()',
        '.promise()',
        '.or()',
        '.and()',
        '.brand()',
        '.readonly()',
        '.pipe()',
        '.shape()',
        '.keyof()',
        '.extend()',
        '.merge()',
        '.pick()',
        '.omit()',
        '.partial()',
        '.deepPartial()',
        '.required()',
        '.passthrough()',
        '.strict()',
        '.strip()',
        '.catchall()',
      ];

      validMethods.forEach((method) => {
        expect(ALLOWED_TYPES_REGEX_PATTERN.test(method)).toBeTruthy();
      });
    });

    it('should not match any invalid methods', async () => {
      const invalidMethods = [
        '.improt()',
        '.reifne()',
        '.tranform()',
        '.strictly()',
        '.errored()',
      ];

      invalidMethods.forEach((method) => {
        expect(ALLOWED_TYPES_REGEX_PATTERN.test(method)).toBeFalsy();
      });
    });
  });
}

/////////////////////////////////////////////
// TEST EXECUTION
/////////////////////////////////////////////

testExtendedDMMFFieldValidatorPattern(ExtendedDMMFModelValidatorPattern);
