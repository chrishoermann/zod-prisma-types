import { DMMF } from '@prisma/generator-helper';
import { it, expect, describe } from 'vitest';

import { DEFAULT_GENERATOR_CONFIG, MODEL_BASE } from '../setup';
import { ExtendedDMMFModelCustomValidators } from '../../07_extendedDMMFModelCustomValidators';
import { GeneratorConfig } from '../../../../schemas/generatorConfigSchema';

/////////////////////////////////////////////
// TEST SUITE
/////////////////////////////////////////////

export function testExtendedDMMFFieldCustomValidators<
  T extends ExtendedDMMFModelCustomValidators,
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

  describe(`ExtendedDMMFFieldCustomValidators`, () => {
    it(`should filter error and import from validator list and write rest to zodCustomValidators property with strict at position 0`, async () => {
      const model = getModel({
        documentation:
          'some text in docs before @zod.import(["import { myFunction } from "../../../../utils/myFunction";"]).error({ invalid_type_error: "some stuff" }).refine(v => v.title.length > 0).transform(...some stuff).strict() some text after',
      });

      expect(model.zodCustomValidators).toEqual([
        '.strict()',
        '.refine(v => v.title.length > 0)',
        '.transform(...some stuff)',
      ]);
      expect(model?.clearedDocumentation).toBe(
        'some text in docs before some text after',
      );
      expect(model.documentation).toBe(
        'some text in docs before @zod.import(["import { myFunction } from "../../../../utils/myFunction";"]).error({ invalid_type_error: "some stuff" }).refine(v => v.title.length > 0).transform(...some stuff).strict() some text after',
      );
    });

    it('should add a description as validator using .describe', async () => {
      const model = getModel({
        documentation:
          'some text in docs before @zod.describe("The dimensions of the product. This is different to the shipping or boxed dimensions and is usually smaller. If you cannot find the product dimensions make this the same as the dimensions_packed.") some text after',
      });

      expect(model.zodCustomValidators).toEqual([
        '.describe("The dimensions of the product. This is different to the shipping or boxed dimensions and is usually smaller. If you cannot find the product dimensions make this the same as the dimensions_packed.")',
      ]);
      expect(model?.clearedDocumentation).toBe(
        'some text in docs before some text after',
      );
      expect(model.documentation).toBe(
        'some text in docs before @zod.describe("The dimensions of the product. This is different to the shipping or boxed dimensions and is usually smaller. If you cannot find the product dimensions make this the same as the dimensions_packed.") some text after',
      );
    });
  });
}

/////////////////////////////////////////////
// TEST EXECUTION
/////////////////////////////////////////////

testExtendedDMMFFieldCustomValidators(ExtendedDMMFModelCustomValidators);
