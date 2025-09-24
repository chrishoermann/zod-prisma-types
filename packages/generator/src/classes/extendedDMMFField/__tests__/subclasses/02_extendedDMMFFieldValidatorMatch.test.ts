import type DMMF from '@prisma/dmmf';
import { it, expect, describe, afterAll } from 'vitest';

import { FIELD_BASE } from '../setup';
import {
  ExtendedDMMFFieldValidatorMatch,
  VALIDATOR_TYPE_REGEX,
} from '../../02_extendedDMMFFieldValidatorMatch';
import { globalConfig } from '../../../../config';
import { DEFAULT_GENERATOR_CONFIG } from '../../../../__tests__/setup';

/////////////////////////////////////////////
// TEST SUITE
/////////////////////////////////////////////

export function testExtendedDMMFFieldValidatorMatch<
  T extends ExtendedDMMFFieldValidatorMatch,
>(classConstructor: new (model: DMMF.Field, modelName: string) => T) {
  const getField = (field?: Partial<DMMF.Field>) =>
    new classConstructor({ ...FIELD_BASE, ...field }, 'ModelName');

  if (!globalConfig.isInitialized()) {
    globalConfig.initializeWithConfig(DEFAULT_GENERATOR_CONFIG);
  }

  afterAll(() => {
    if (globalConfig.isInitialized()) {
      globalConfig.reset();
    }
  });

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

    it(`should load a class with docs and custom validator containing template string`, async () => {
      const field = getField({
        documentation:
          'some text in docs  @zod.custom.use(z.literal(`foo${string}`))',
      });
      const match = field?.['_validatorMatch'];
      expect(match?.groups?.['validatorPattern']).toBe(
        '.use(z.literal(`foo${string}`))',
      );
      expect(field?.clearedDocumentation).toBe('some text in docs');
      expect(field.documentation).toBe(
        'some text in docs  @zod.custom.use(z.literal(`foo${string}`))',
      );
    });

    it(`should match japanese characters in the regex`, async () => {
      const match = VALIDATOR_TYPE_REGEX.exec(
        `@zod.string({ error: "ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。" }).min(5, { error: "ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。" })`,
      );

      expect(match?.groups?.['customErrors']).toBe(
        '({ error: "ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。" })',
      );
      expect(match?.groups?.['validatorPattern']).toBe(
        '.min(5, { error: "ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。" })',
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
        `@zod.import(["import { myFunction } from "../../../../utils/myFunction";", "import { myFunction } from "../../../../utils/myFunction";"]).string({ error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]|", description: "some description" }).cuid()`,
      );

      expect(match?.groups?.['validatorPattern']).toBe('.cuid()');
      expect(match?.groups?.['import']).toBe(
        '.import(["import { myFunction } from "../../../../utils/myFunction";", "import { myFunction } from "../../../../utils/myFunction";"])',
      );
      expect(match?.groups?.['imports']).toBe(
        '"import { myFunction } from "../../../../utils/myFunction";", "import { myFunction } from "../../../../utils/myFunction";"',
      );
      expect(match?.groups?.['customErrors']).toBe(
        `({ error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]|", description: "some description" })`,
      );
      expect(match?.groups?.['type']).toBe('string');
    });

    it('should match function-based error customization for string type', async () => {
      const match = VALIDATOR_TYPE_REGEX.exec(
        `@zod.string({ error: (issue) => issue.input === undefined ? "This field is required" : "Not a string" }).min(5, { error: (issue) => \`Value must be at least \${issue.minimum} characters\` })`,
      );

      expect(match?.groups?.['customErrors']).toBe(
        '({ error: (issue) => issue.input === undefined ? "This field is required" : "Not a string" })',
      );
      expect(match?.groups?.['validatorPattern']).toBe(
        '.min(5, { error: (issue) => `Value must be at least ${issue.minimum} characters` })',
      );
    });

    it('should match function-based error customization for number type', async () => {
      const match = VALIDATOR_TYPE_REGEX.exec(
        `@zod.number({ error: (issue) => issue.input === undefined ? "This field is required" : "Must be a number" }).gt(0, { error: (issue) => \`Value must be greater than \${issue.minimum}\` })`,
      );

      expect(match?.groups?.['customErrors']).toBe(
        '({ error: (issue) => issue.input === undefined ? "This field is required" : "Must be a number" })',
      );
      expect(match?.groups?.['validatorPattern']).toBe(
        '.gt(0, { error: (issue) => `Value must be greater than ${issue.minimum}` })',
      );
    });

    it('should match function-based error customization with conditional logic', async () => {
      const match = VALIDATOR_TYPE_REGEX.exec(
        `@zod.string({ error: (issue) => { if (issue.code === "invalid_type") return "Invalid type"; if (issue.code === "too_small") return "Too short"; return undefined; } }).min(3, { error: (issue) => issue.code === "too_small" ? \`Minimum length is \${issue.minimum}\` : undefined })`,
      );

      expect(match?.groups?.['customErrors']).toBe(
        '({ error: (issue) => { if (issue.code === "invalid_type") return "Invalid type"; if (issue.code === "too_small") return "Too short"; return undefined; } })',
      );
      expect(match?.groups?.['validatorPattern']).toBe(
        '.min(3, { error: (issue) => issue.code === "too_small" ? `Minimum length is ${issue.minimum}` : undefined })',
      );
    });

    it('should match function-based error customization for date type', async () => {
      const match = VALIDATOR_TYPE_REGEX.exec(
        `@zod.date({ error: (issue) => issue.input === undefined ? "Date is required" : "Invalid date format" }).min(new Date("2020-01-01"), { error: (issue) => \`Date must be after \${issue.minimum.toISOString().split('T')[0]}\` })`,
      );

      expect(match?.groups?.['customErrors']).toBe(
        '({ error: (issue) => issue.input === undefined ? "Date is required" : "Invalid date format" })',
      );
      expect(match?.groups?.['validatorPattern']).toBe(
        '.min(new Date("2020-01-01"), { error: (issue) => `Date must be after ${issue.minimum.toISOString().split(\'T\')[0]}` })',
      );
    });
  });
}

/////////////////////////////////////////////
// TEST EXECUTION
/////////////////////////////////////////////

testExtendedDMMFFieldValidatorMatch(ExtendedDMMFFieldValidatorMatch);
