import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFFieldArrayValidatorString } from './extendedDMMFFieldArrayValidatorString';
import { CUSTOM_OMIT_VALIDATOR_MESSAGE_REGEX } from './extendedDMMFFieldValidatorMap';
import { GeneratorConfig } from '../../schemas';

/////////////////////////////////////////////////
// TYPES
/////////////////////////////////////////////////

export type OmitFieldMode = 'model' | 'input' | 'all' | 'none';

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

    const isValid = this._validatorIsValid();

    console.log('isValid', isValid, this._validatorList);

    const omitFieldPattern = this._extractOmitFieldPattern();

    console.log({ isValid, omitFieldPattern });

    // return this._validatorIsValid()
    //   ? this._extractOmitFieldPattern()
    //   : this.zodOmitField;

    return 'none';
  }

  // HELPER
  // ----------------------------------------------

  private _extractOmitFieldPattern() {
    const list = this._getZodValidatorListWithoutArray();
    const pattern = list?.find((pattern) => pattern.includes('.omit'));
    const match = pattern?.match(CUSTOM_OMIT_VALIDATOR_MESSAGE_REGEX);

    console.log({ list, pattern, match });

    return this._getZodValidatorListWithoutArray()
      ?.find((pattern) => pattern.includes('.omit'))
      ?.match(CUSTOM_OMIT_VALIDATOR_MESSAGE_REGEX)?.groups?.['validator'];
  }
}
