import { describe, it, expect } from 'vitest';

import { ExtendedDMMF } from '../../../ExtendedDMMF';
import { loadDMMF } from '../../utils/loadDMMF';
describe('test validator error messages', () => {
  it('should throw if an invalid key is used', async () => {
    const dmmf = await loadDMMF(`${__dirname}/invalidType.prisma`);
    expect(() => new ExtendedDMMF(dmmf, {})).toThrowError(
      "[@zod generator error]: 'asdf' is not a valid validator type. [Error Location]: Model: 'MyModel', Field: 'custom'.",
    );
  });

  it('should throw if the wrong key is used', async () => {
    const dmmf = await loadDMMF(`${__dirname}/invalidPrismaType.prisma`);
    expect(() => new ExtendedDMMF(dmmf, {})).toThrowError(
      "[@zod generator error]: Validator 'number' is not valid for type 'String'. [Error Location]: Model: 'MyModel', Field: 'custom'.",
    );
  });

  it("should throw if the wrong validator is used for a type that doesn't support it", async () => {
    const dmmf = await loadDMMF(`${__dirname}/invalidValidator.prisma`);
    expect(() => new ExtendedDMMF(dmmf, {})).toThrowError(
      "[@zod generator error]: Validator 'lt' is not valid for type 'String' or for specified '@zod.[key]'. [Error Location]: Model: 'MyModel', Field: 'custom'.",
    );
  });

  it("should throw if the wrong validator key is used for a type that doesn't support it", async () => {
    const dmmf = await loadDMMF(`${__dirname}/invalidValidatorKey.prisma`);
    expect(() => new ExtendedDMMF(dmmf, {})).toThrowError(
      "[@zod generator error]: Validator 'asdf' is not valid for type 'String' or for specified '@zod.[key]'. [Error Location]: Model: 'MyModel', Field: 'custom'.",
    );
  });

  it('should throw if a validator text is used', async () => {
    const dmmf = await loadDMMF(`${__dirname}/invalidValidatorText.prisma`);
    expect(() => new ExtendedDMMF(dmmf, {})).toThrowError(
      "[@zod generator error]: Could not match validator 'max' with validatorPattern '.max(5, { muasssage: \"Custom message.\"})'. Please check for typos! [Error Location]: Model: 'MyModel', Field: 'date'.",
    );
  });
});
