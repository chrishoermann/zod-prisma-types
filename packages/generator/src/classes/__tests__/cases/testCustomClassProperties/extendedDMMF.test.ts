import { describe, it, expect } from 'vitest';

import { configSchema } from '../../../../schemas';
import { ExtendedDMMF } from '../../../ExtendedDMMF';
import { loadDMMF } from '../../utils/loadDMMF';

describe('testSimpleModelNoValidators', async () => {
  const dmmf = await loadDMMF(`${__dirname}/extendedDMMF.prisma`);

  it('should set default values in ExtendedDMMF class without config', async () => {
    const extendedDMMF = new ExtendedDMMF(dmmf, configSchema.parse({}));

    expect(extendedDMMF.generatorConfig.createInputTypes).toStrictEqual(true);
    expect(extendedDMMF.generatorConfig.addInputTypeValidation).toStrictEqual(
      true,
    );
  });

  it('should set default values in ExtendedDMMF class with config', async () => {
    const extendedDMMFConfig = configSchema.parse({
      useInstanceOfForDecimal: 'true',
      createInputTypes: 'false',
      addInputTypeValidation: 'false',
    });
    const extendedDMMF = new ExtendedDMMF(dmmf, extendedDMMFConfig);

    expect(extendedDMMF.generatorConfig.createInputTypes).toStrictEqual(false);
    expect(extendedDMMF.generatorConfig.addInputTypeValidation).toStrictEqual(
      false,
    );
  });
});
