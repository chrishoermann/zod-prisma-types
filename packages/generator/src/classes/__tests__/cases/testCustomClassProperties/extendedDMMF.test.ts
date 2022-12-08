import { describe, it, expect } from 'vitest';

import { ExtendedDMMF } from '../../../ExtendedDMMF';
import { loadDMMF } from '../../utils/loadDMMF';
describe('testSimpleModelNoValidators', async () => {
  const dmmf = await loadDMMF(`${__dirname}/extendedDMMF.prisma`);

  it('should set default values in ExtendedDMMF class without config', async () => {
    const extendedDMMF = new ExtendedDMMF(dmmf, {});

    expect(extendedDMMF.useDecimalJs()).toBe(true);
    expect(extendedDMMF.useValidatorJs()).toBe(false);
    expect(extendedDMMF.createInputTypes()).toStrictEqual(true);
    expect(extendedDMMF.addInputTypeValidation()).toStrictEqual(true);
    expect(extendedDMMF.config.useDecimalJs).toStrictEqual(true);
    expect(extendedDMMF.config.useValidatorJs).toStrictEqual(false);
    expect(extendedDMMF.config.imports).toStrictEqual([]);
    expect(extendedDMMF.config.createInputTypes).toStrictEqual(true);
    expect(extendedDMMF.config.addInputTypeValidation).toStrictEqual(true);
  });

  it('should set default values in ExtendedDMMF class with config', async () => {
    const extendedDMMFConfig = {
      useDecimalJs: 'false',
      useValidatorJs: 'true',
      imports:
        "import(import { myFunction } from 'mypackage').import(import { custom } from './myfolder')",
      createInputTypes: 'false',
      addInputTypeValidation: 'false',
    };
    const extendedDMMF = new ExtendedDMMF(dmmf, extendedDMMFConfig);

    expect(extendedDMMF.useDecimalJs()).toBe(false);
    expect(extendedDMMF.useValidatorJs()).toBe(true);
    expect(extendedDMMF.createInputTypes()).toStrictEqual(false);
    expect(extendedDMMF.addInputTypeValidation()).toStrictEqual(false);
    expect(extendedDMMF.config.useDecimalJs).toStrictEqual(false);
    expect(extendedDMMF.config.useValidatorJs).toStrictEqual(true);
    expect(extendedDMMF.config.imports).toStrictEqual([
      "import { myFunction } from 'mypackage'",
      "import { custom } from './myfolder'",
    ]);
    expect(extendedDMMF.config.createInputTypes).toStrictEqual(false);
    expect(extendedDMMF.config.addInputTypeValidation).toStrictEqual(false);
  });
});
