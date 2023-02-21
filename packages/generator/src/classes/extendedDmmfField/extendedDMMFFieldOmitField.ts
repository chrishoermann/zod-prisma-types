import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFFieldArrayValidatorString } from './extendedDMMFFieldArrayValidatorString';
import { CUSTOM_OMIT_VALIDATOR_MESSAGE_REGEX } from './extendedDMMFFieldValidatorMap';
import { GeneratorConfig } from '../../schemas';

/////////////////////////////////////////////////
// TYPES
/////////////////////////////////////////////////

export type OmitFieldMode = 'model' | 'input' | 'all' | 'none';

/////////////////////////////////////////////////
// REGEX
/////////////////////////////////////////////////

export const CUSTOM_VALIDATOR_VALID_MODE_REGEX = /model|input/;

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFFieldOmitField extends ExtendedDMMFFieldArrayValidatorString {
  readonly zodOmitField: OmitFieldMode = 'none';

  constructor(
    field: DMMF.Field,
    generatorConfig: GeneratorConfig,
    modelName: string,
  ) {
    super(field, generatorConfig, modelName);

    this.zodOmitField = this._getZodOmitFieldString();
  }

  // GET OMIT FIELD STRING
  // ----------------------------------------------

  private _getZodOmitFieldString() {
    if (!this._validatorType || this._validatorType !== 'custom')
      return this.zodOmitField;

    return this._validatorIsValid()
      ? this._extractOmitFieldMode()
      : this.zodOmitField;
  }

  // HELPER
  // ----------------------------------------------

  private _extractOmitFieldMode() {
    const omitFieldModes = this._getOmitFieldModes();

    omitFieldModes?.forEach((field) => {
      if (!CUSTOM_VALIDATOR_VALID_MODE_REGEX.test(field))
        throw new Error(
          `[@zod generator error]: unknown key '${field}' in '.omit()'. only 'model' and 'input' are allowed. ${this.errorLocation}`,
        );
    });

    if (!omitFieldModes) {
      return 'none';
    }

    if (omitFieldModes.length === 2) {
      return 'all';
    }

    return omitFieldModes[0].trim() as OmitFieldMode;
  }

  private _getOmitFieldModes() {
    return this._getZodValidatorListWithoutArray()
      ?.find((pattern) => pattern.includes('.omit'))
      ?.match(CUSTOM_OMIT_VALIDATOR_MESSAGE_REGEX)
      ?.groups?.['pattern']?.match(/[\w]+/g);
  }
}
