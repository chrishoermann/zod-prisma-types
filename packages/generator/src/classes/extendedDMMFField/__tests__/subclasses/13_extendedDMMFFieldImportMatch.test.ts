import type DMMF from '@prisma/dmmf';
import { it, expect, describe } from 'vitest';

import { DEFAULT_GENERATOR_CONFIG, FIELD_BASE } from '../setup';
import { ExtendedDMMFFieldImportMatch } from '../../13_extendedDMMFFieldImportMatch';
import { GeneratorConfig } from '../../../../schemas/generatorConfigSchema';
import { VALIDATOR_TYPE_REGEX } from '../../02_extendedDMMFFieldValidatorMatch';

/////////////////////////////////////////////
// TEST SUITE
/////////////////////////////////////////////

export function testExtendedDMMFFieldImportMatch<
  T extends ExtendedDMMFFieldImportMatch,
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

  describe(`ExtendedDMMFFieldImportMatch`, () => {
    it('should match a valid import string', async () => {
      const field = getField({
        documentation: `@zod.import(["import { myFunction } from "../../../../utils/myFunction";", "import { myFunction } from "../../../../utils/myOtherFunction";"]).string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]|", required_error: "some other", description: "some description" }).cuid()`,
      });

      expect(field?.['_validatorMatch']).toBeDefined();

      expect(field?.['_importStatements']).toBe(
        `"import { myFunction } from "../../../../utils/myFunction";", "import { myFunction } from "../../../../utils/myOtherFunction";"`,
      );
      expect(field?.['imports']).toBeDefined();
      expect(field?.['imports']?.size).toBe(2);
      expect(field.imports).toEqual(
        new Set([
          `import { myFunction } from '../../../../utils/myFunction';`,
          `import { myFunction } from '../../../../utils/myOtherFunction';`,
        ]),
      );
    });

    it('should match a string with an import dircetive', async () => {
      const match = VALIDATOR_TYPE_REGEX.exec(
        `@zod.import(["import { myFunction } from "../../../../utils/myFunction";", "import { myFunction } from "../../../../utils/myOtherFunction";"]).string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]|", required_error: "some other", description: "some description" }).cuid()`,
      );

      expect(match?.groups?.['validatorPattern']).toBe('.cuid()');
      expect(match?.groups?.['import']).toBe(
        '.import(["import { myFunction } from "../../../../utils/myFunction";", "import { myFunction } from "../../../../utils/myOtherFunction";"])',
      );
      expect(match?.groups?.['imports']).toBe(
        '"import { myFunction } from "../../../../utils/myFunction";", "import { myFunction } from "../../../../utils/myOtherFunction";"',
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

testExtendedDMMFFieldImportMatch(ExtendedDMMFFieldImportMatch);
