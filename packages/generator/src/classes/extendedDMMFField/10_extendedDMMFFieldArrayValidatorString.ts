import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFFieldCustomValidatorString } from './09_extendedDMMFFieldCustomValidatorString';
import {
  ARRAY_VALIDATOR_MESSAGE_REGEX,
  ValidatorMap,
} from './07_extendedDMMFFieldValidatorMap';
import { GeneratorConfig } from '../../schemas';
import {
  getNestedValidatorList,
  getSplitIndices,
} from '../../utils/getNestedValidatorList';

/////////////////////////////////////////////////
// TYPE
/////////////////////////////////////////////////

export type ZodArrayValidatorKeys = 'min' | 'max' | 'length' | 'nonempty';

/////////////////////////////////////////////////
// REGEX
/////////////////////////////////////////////////

export const ARRAY_VALIDATOR_NUMBER_AND_MESSAGE_REGEX =
  /.(?<validator>min|max|length|nonempty)\((?<number>[\d]+)([,][ ]?)?(?<message>[{][ ]?message:[ ]?['"][\w\W\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]+['"][ ]?[}])?\)/u;

export const ARRAY_VALIDATOR_NUMBER_OR_STRING_AND_MESSAGE_REGEX =
  /.(?<validator>min|max|length|nonempty)\((?<number>[\w.]+)([,][ ]?)?(?<message>[{][ ]?message:[ ]?['"][\w\W\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]+['"][ ]?[}])?\)/u;

export const ARRAY_VALIDATOR_WITH_MESSAGE_REGEX =
  /(?<validator>nonempty)(\((?<message>[{][ ]?message:[ ]?['"][\w\W\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]+['"][ ]?[}])?\))/u;

/////////////////////////////////////////////////
// MAP
/////////////////////////////////////////////////

export const ARRAY_VALIDATOR_REGEX_MAP: ValidatorMap<ZodArrayValidatorKeys> = {
  min: ARRAY_VALIDATOR_NUMBER_OR_STRING_AND_MESSAGE_REGEX,
  max: ARRAY_VALIDATOR_NUMBER_OR_STRING_AND_MESSAGE_REGEX,
  length: ARRAY_VALIDATOR_NUMBER_OR_STRING_AND_MESSAGE_REGEX,
  nonempty: ARRAY_VALIDATOR_WITH_MESSAGE_REGEX,
};

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFFieldArrayValidatorString extends ExtendedDMMFFieldCustomValidatorString {
  readonly zodArrayValidatorString?: string;

  constructor(
    field: DMMF.Field,
    generatorConfig: GeneratorConfig,
    modelName: string,
  ) {
    super(field, generatorConfig, modelName);

    this.zodArrayValidatorString = this._getZodArrayValidatorString();
  }

  // GET ARRAY VALIDATOR STRING
  // ----------------------------------------------

  private _getZodArrayValidatorString() {
    if (!this._validatorType) return this.zodArrayValidatorString;

    return this._validatorIsValid()
      ? this._extractArrayPattern()
      : this.zodArrayValidatorString;
  }

  // HELPER
  // ----------------------------------------------

  private _extractArrayPattern() {
    const pattern = this._getZodValidatorListArray()
      ?.find((pattern) => pattern.includes('.array'))
      ?.match(ARRAY_VALIDATOR_MESSAGE_REGEX)?.groups?.['pattern'];

    if (pattern && !this.isList) {
      // console.log(
      //   'pattern',
      //   pattern,
      //   nestedList,
      //   this._getZodValidatorListArray(),
      // );
      throw new Error(
        `[@zod generator error]: '.array' validator is only allowed on lists. ${this._errorLocation}`,
      );
    }

    return this._getValidArrayPattern(pattern);
  }

  private _getValidArrayPattern(pattern?: string) {
    if (!pattern) return;

    const validatorList = this._getArrayValidatorList(pattern);

    validatorList.forEach((pattern) => {
      const isValid = this._validateRegexInMap(ARRAY_VALIDATOR_REGEX_MAP, {
        key: this._getValidatorKeyFromPattern(pattern),
        pattern,
      });

      if (!isValid) {
        throw new Error(
          `[@zod generator error]: '${pattern}' is not valid as array validator. ${this._errorLocation}`,
        );
      }
    });

    return pattern;
  }

  private _getArrayValidatorList(pattern: string) {
    return getNestedValidatorList(pattern);
  }
}
