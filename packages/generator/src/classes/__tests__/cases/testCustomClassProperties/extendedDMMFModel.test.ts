import { describe, it, expect, afterAll } from 'vitest';

import { DEFAULT_GENERATOR_CONFIG } from '../../../../__tests__/setup';
import { globalConfig } from '../../../../config';
import { getStringVariants } from '../../../../utils/getStringVariants';
import { ExtendedDMMF } from '../../../extendedDMMF';
import { loadDMMF } from '../../utils/loadDMMF';

describe('testSimpleModelNoValidators', async () => {
  if (!globalConfig.isInitialized()) {
    globalConfig.initializeWithConfig(DEFAULT_GENERATOR_CONFIG);
  }

  afterAll(() => {
    if (globalConfig.isInitialized()) {
      globalConfig.reset();
    }
  });

  const dmmf = await loadDMMF(`${__dirname}/extendedDMMFModel.prisma`);
  const extendedDMMF = new ExtendedDMMF(dmmf);
  const model = extendedDMMF.datamodel.models[0];

  it('should set expected values in model', () => {
    expect(model.formattedNames).toStrictEqual(getStringVariants(model.name));
    expect(model.scalarFields.length).toBe(2);
    expect(model.relationFields.length).toBe(0);
    expect(model.hasRelationFields).toBe(false);
    expect(model.fields.length).toBe(2);
  });
});
