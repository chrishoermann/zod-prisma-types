import { DMMF } from '@prisma/generator-helper';
import { it, expect, describe } from 'vitest';

import { DEFAULT_GENERATOR_CONFIG, FIELD_BASE } from '../setup';
import {
  ExtendedDMMFFieldValidatorMatch,
  VALIDATOR_TYPE_REGEX,
} from '../../02_extendedDMMFFieldValidatorMatch';
import { GeneratorConfig } from '../../../../schemas/generatorConfigSchema';

/////////////////////////////////////////////
// TEST SUITE
/////////////////////////////////////////////

export function testExtendedDMMFFieldValidatorMatch<
  T extends ExtendedDMMFFieldValidatorMatch,
>(
  classConstructor: new (
    model: DMMF.Field,
    generatorConfig: GeneratorConfig,
    modelName: string,
  ) => T,
) {
  const getField = (field?: Partial<DMMF.Field>) =>
    new classConstructor(
      { ...FIELD_BASE, ...field },
      DEFAULT_GENERATOR_CONFIG,
      'ModelName',
    );

  describe(`ExtendedDMMFFieldValidatorMatch`, () => {
    it(`should load a class without docs`, async () => {
      const field = getField();
      expect(field?.['_validatorMatch']).toBe(undefined);
      expect(field?.clearedDocumentation).toBe(undefined);
    });

    it(`should load a class with docs`, async () => {
      const field = getField({ documentation: 'some text in docs' });
      expect(field?.['_validatorMatch']).toBeUndefined();
      expect(field?.clearedDocumentation).toBe('some text in docs');
      expect(field.documentation).toBe('some text in docs');
    });

    it(`should load a class with docs and string validator`, async () => {
      const field = getField({
        documentation: 'some text in docs @zod.string.max(4)',
      });
      const match = field?.['_validatorMatch'];
      expect(match?.groups?.['validatorPattern']).toBe('.max(4)');
      expect(field?.clearedDocumentation).toBe('some text in docs');
      expect(field.documentation).toBe('some text in docs @zod.string.max(4)');
    });

    it(`should load a class with docs and number validator`, async () => {
      const field = getField({
        type: 'Int',
        documentation: 'some text in docs @zod.number.lt(4)',
      });
      const match = field?.['_validatorMatch'];
      expect(match?.groups?.['validatorPattern']).toBe('.lt(4)');
      expect(field?.clearedDocumentation).toBe('some text in docs');
      expect(field.documentation).toBe('some text in docs @zod.number.lt(4)');
    });

    it(`should load a class with docs and bigInt validator`, async () => {
      const field = getField({
        type: 'BigInt',
        isList: true,
        documentation: 'some text in docs @zod.bigint.array(.length(4))',
      });
      const match = field?.['_validatorMatch'];
      expect(match?.groups?.['validatorPattern']).toBe('.array(.length(4))');
      expect(field?.clearedDocumentation).toBe('some text in docs');
      expect(field.documentation).toBe(
        'some text in docs @zod.bigint.array(.length(4))',
      );
    });

    it(`should load a class with docs and date validator`, async () => {
      const field = getField({
        type: 'DateTime',
        documentation:
          'some text in docs  @zod.date.min(new Date("2020-01-01"))',
      });
      const match = field?.['_validatorMatch'];
      expect(match?.groups?.['validatorPattern']).toBe(
        '.min(new Date("2020-01-01"))',
      );
      expect(field?.clearedDocumentation).toBe('some text in docs');
      expect(field.documentation).toBe(
        'some text in docs  @zod.date.min(new Date("2020-01-01"))',
      );
    });

    it(`should load a class with docs and custom validator`, async () => {
      const field = getField({
        documentation: 'some text in docs  @zod.custom.use(z.string().min(4))',
      });
      const match = field?.['_validatorMatch'];
      expect(match?.groups?.['validatorPattern']).toBe(
        '.use(z.string().min(4))',
      );
      expect(field?.clearedDocumentation).toBe('some text in docs');
      expect(field.documentation).toBe(
        'some text in docs  @zod.custom.use(z.string().min(4))',
      );
    });

    it(`should match japanese characters in the regex`, async () => {
      const match = VALIDATOR_TYPE_REGEX.exec(
        `@zod.string({ invalid_type_error: "ひらがな、カタカナ、漢字が少なくとも1つずつ含まれる必要があります。" }).min(5, { message: "ひらがな、カタカナ、漢字が少なくとも1つずつ含まれる必要があります。" })`,
      );

      expect(match?.groups?.['customErrors']).toBe(
        '({ invalid_type_error: "ひらがな、カタカナ、漢字が少なくとも1つずつ含まれる必要があります。" })',
      );
      expect(match?.groups?.['validatorPattern']).toBe(
        '.min(5, { message: "ひらがな、カタカナ、漢字が少なくとも1つずつ含まれる必要があります。" })',
      );
    });

    it(`should match nested custom annotations`, async () => {
      const match = VALIDATOR_TYPE_REGEX.exec(
        `@zod.custom.use(z.object({contents: z.array(z.object({locale: z.string(), content: z.string()}))}))`,
      );

      expect(match?.groups?.['validatorPattern']).toBe(
        '.use(z.object({contents: z.array(z.object({locale: z.string(), content: z.string()}))}))',
      );
    });

    it('should match a string with an import dircetive', async () => {
      const match = VALIDATOR_TYPE_REGEX.exec(
        `@zod.import(["import { myFunction } from "../../../../utils/myFunction";", "import { myFunction } from "../../../../utils/myFunction";"]).string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]|", required_error: "some other", description: "some description" }).cuid()`,
      );

      expect(match?.groups?.['validatorPattern']).toBe('.cuid()');
      expect(match?.groups?.['import']).toBe(
        '.import(["import { myFunction } from "../../../../utils/myFunction";", "import { myFunction } from "../../../../utils/myFunction";"])',
      );
      expect(match?.groups?.['imports']).toBe(
        '"import { myFunction } from "../../../../utils/myFunction";", "import { myFunction } from "../../../../utils/myFunction";"',
      );
      expect(match?.groups?.['customErrors']).toBe(
        `({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]|", required_error: "some other", description: "some description" })`,
      );
      expect(match?.groups?.['type']).toBe('string');
    });
  });
}

/////////////////////////////////////////////
// TEST EXECUTION
/////////////////////////////////////////////

testExtendedDMMFFieldValidatorMatch(ExtendedDMMFFieldValidatorMatch);
