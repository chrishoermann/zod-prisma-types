import { describe, it, expect } from 'vitest';

import { ExtendedDMMF } from '../../../ExtendedDMMF';
import { loadDMMF } from '../../utils/loadDMMF';

describe('testSimpleModelNoValidators', async () => {
  const dmmf = await loadDMMF(`${__dirname}/extendedDMMF.prisma`);

  it('should set default values in ExtendedDMMF class without config', async () => {
    const extendedDMMF = new ExtendedDMMF(dmmf, {});

    expect(extendedDMMF.createInputTypes()).toStrictEqual(true);
    expect(extendedDMMF.addInputTypeValidation()).toStrictEqual(true);
    expect(extendedDMMF.generatorConfig.createInputTypes).toStrictEqual(true);
    expect(extendedDMMF.generatorConfig.addInputTypeValidation).toStrictEqual(
      true,
    );
  });

  it('should set default values in ExtendedDMMF class with config', async () => {
    const extendedDMMFConfig = {
      useInstanceOfForDecimal: 'true',
      imports:
        "import(import { myFunction } from 'mypackage').import(import { custom } from './myfolder')",
      createInputTypes: 'false',
      addInputTypeValidation: 'false',
    };
    const extendedDMMF = new ExtendedDMMF(dmmf, extendedDMMFConfig);

    expect(extendedDMMF.createInputTypes()).toStrictEqual(false);
    expect(extendedDMMF.addInputTypeValidation()).toStrictEqual(false);

    expect(extendedDMMF.generatorConfig.createInputTypes).toStrictEqual(false);
    expect(extendedDMMF.generatorConfig.addInputTypeValidation).toStrictEqual(
      false,
    );
  });
});
