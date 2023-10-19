import { DMMF } from '@prisma/generator-helper';
import { it, expect, describe } from 'vitest';

import { DEFAULT_GENERATOR_CONFIG, MODEL_BASE } from './setup';
import { ExtendedDMMFModelValidatorPattern } from '../04_extendedDMMFModelValidatorPattern';

const getModel = (model?: Partial<DMMF.Model>) =>
  new ExtendedDMMFModelValidatorPattern(DEFAULT_GENERATOR_CONFIG, {
    ...MODEL_BASE,
    ...model,
  });

describe(`ExtendedDMMFFieldValidatorPattern`, () => {
  it(`should load a class with docs and validator`, async () => {
    const model = getModel({
      documentation:
        'some text in docs before @zod.import(["import { myFunction } from "../../../../utils/myFunction";"]).refine(v => v.title.length > 0).transform(...some stuff).strict() some text after',
    });

    expect(model?.['_validatorList']).toEqual([
      '.import(["import { myFunction } from "../../../../utils/myFunction";"])',
      '.refine(v => v.title.length > 0)',
      '.transform(...some stuff)',
      '.strict()',
    ]);
    expect(model?.clearedDocumentation).toBe(
      'some text in docs before some text after',
    );
    expect(model.documentation).toBe(
      'some text in docs before @zod.import(["import { myFunction } from "../../../../utils/myFunction";"]).refine(v => v.title.length > 0).transform(...some stuff).strict() some text after',
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
});
