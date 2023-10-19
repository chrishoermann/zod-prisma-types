import { DMMF } from '@prisma/generator-helper';
import { it, expect, describe } from 'vitest';

import {
  DEFAULT_GENERATOR_CONFIG,
  MODEL_BASE,
  MODEL_WITH_AUTO_IMPORT_FILDS,
} from './setup';
import { ExtendedDMMFModelImportStatement } from '../05_extendedDMMFModelImportStatement';

const getModel = (model?: Partial<DMMF.Model>) =>
  new ExtendedDMMFModelImportStatement(DEFAULT_GENERATOR_CONFIG, {
    ...MODEL_BASE,
    ...model,
  });

describe(`ExtendedDMMFFieldValidatorPattern`, () => {
  it(`should find all import statements`, async () => {
    const model = getModel({
      documentation:
        'some text in docs before @zod.import(["import { myFunction } from "../../../../utils/myFunction";", "import validator from "validator";"]).refine(v => v.title.length > 0).import(["import { myOtherFunction } from "../../../../utils/myOtherFunction";"]) some text after',
    });

    expect(model?.['_validatorList']).toEqual([
      '.import(["import { myFunction } from "../../../../utils/myFunction";", "import validator from "validator";"])',
      '.refine(v => v.title.length > 0)',
      '.import(["import { myOtherFunction } from "../../../../utils/myOtherFunction";"])',
    ]);

    expect(model?.['_importStatements']).toEqual([
      '"import { myFunction } from "../../../../utils/myFunction";", "import validator from "validator";"',
      '"import { myOtherFunction } from "../../../../utils/myOtherFunction";"',
    ]);

    expect(model.customImports).toEqual(
      new Set([
        "import { myFunction } from '../../../../utils/myFunction';",
        "import validator from 'validator';",
        "import { myOtherFunction } from '../../../../utils/myOtherFunction';",
      ]),
    );

    expect(model.imports).toEqual(
      new Set([
        "import { myFunction } from '../../../../utils/myFunction';",
        "import validator from 'validator';",
        "import { myOtherFunction } from '../../../../utils/myOtherFunction';",
      ]),
    );
  });

  it(`should remove double imports`, async () => {
    const model = getModel({
      documentation:
        '@zod.import(["import { myFunction } from "../../../../utils/myFunction";", "import { myFunction } from "../../../../utils/myFunction";"])',
    });

    expect(model?.['_validatorList']).toEqual([
      '.import(["import { myFunction } from "../../../../utils/myFunction";", "import { myFunction } from "../../../../utils/myFunction";"])',
    ]);

    expect(model?.['_importStatements']).toEqual([
      '"import { myFunction } from "../../../../utils/myFunction";", "import { myFunction } from "../../../../utils/myFunction";"',
    ]);

    expect(model.customImports).toEqual(
      new Set(["import { myFunction } from '../../../../utils/myFunction';"]),
    );
    expect(model.imports).toEqual(
      new Set(["import { myFunction } from '../../../../utils/myFunction';"]),
    );
  });

  // it(`should check automatic imports`, async () => {

  // });

  it('should not load a class with invalid characters in import pattern', async () => {
    expect(() =>
      getModel({
        documentation:
          'some text in docs before @zod.import(["import { myFunction } from "+../../../../utils/myFunction";"]).refine(v => v.title.length > 0).transform(...some stuff).strict() some text after',
      }),
    ).toThrowError(
      `[@zod generator error]: import statement is not valid. Check for unusal characters. [Error Location]: Model: 'User'`,
    );
  });

  // todo: Write tests that check automatic imports and the merge of custom and automatic imports

  it(`should load a class with automatic imports`, async () => {
    const model = getModel(MODEL_WITH_AUTO_IMPORT_FILDS);

    expect(model?.['_automaticImports']).toEqual([
      `import { NullableJsonValue } from '../${DEFAULT_GENERATOR_CONFIG.inputTypePath}/NullableJsonValue'`,
      `import { InputJsonValue } from '../${DEFAULT_GENERATOR_CONFIG.inputTypePath}/InputJsonValue'`,
      `import { DecimalJSLikeSchema } from '../${DEFAULT_GENERATOR_CONFIG.inputTypePath}/DecimalJsLikeSchema'`,
      `import { isValidDecimalInput } from '../${DEFAULT_GENERATOR_CONFIG.inputTypePath}/isValidDecimalInput'`,
      `import { RoleSchema } from '../${DEFAULT_GENERATOR_CONFIG.inputTypePath}/RoleSchema'`,
    ]);
  });
  it(`should load a class with automatic and custom imports`, async () => {
    const model = getModel({
      ...MODEL_WITH_AUTO_IMPORT_FILDS,
      documentation:
        '@zod.import(["import { myFunction } from "../../../../utils/myFunction";", "import validator from "validator";"])',
    });

    expect(model.imports).toEqual(
      new Set([
        `import { NullableJsonValue } from '../${DEFAULT_GENERATOR_CONFIG.inputTypePath}/NullableJsonValue'`,
        `import { InputJsonValue } from '../${DEFAULT_GENERATOR_CONFIG.inputTypePath}/InputJsonValue'`,
        `import { DecimalJSLikeSchema } from '../${DEFAULT_GENERATOR_CONFIG.inputTypePath}/DecimalJsLikeSchema'`,
        `import { isValidDecimalInput } from '../${DEFAULT_GENERATOR_CONFIG.inputTypePath}/isValidDecimalInput'`,
        `import { RoleSchema } from '../${DEFAULT_GENERATOR_CONFIG.inputTypePath}/RoleSchema'`,
        "import { myFunction } from '../../../../utils/myFunction';",
        "import validator from 'validator';",
      ]),
    );
  });
});
