import type DMMF from '@prisma/dmmf';

import {
  ExtendedDMMFFieldValidatorMap,
  STRING_FORMAT_VALIDATOR_ISO_MESSAGE_REGEX,
  STRING_FORMAT_VALIDATOR_REGEX_MAP_KEYS,
  ZodSharedStringFormatValidatorsIso,
} from './07_extendedDMMFFieldValidatorMap';

// order matters
const ISO_VALIDATOR_MAP: [ZodSharedStringFormatValidatorsIso, string][] = [
  ['isoDatetime', 'iso.datetime'],
  ['isoDate', 'iso.date'],
  ['isoTime', 'iso.time'],
  ['isoDuration', 'iso.duration'],
  ['datetime', 'iso.datetime'],
  ['date', 'iso.date'],
  ['time', 'iso.time'],
  ['duration', 'iso.duration'],
];

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFFieldValidatorString extends ExtendedDMMFFieldValidatorMap {
  readonly zodValidatorString?: string;
  readonly isTopLevelValidator?: boolean;

  constructor(field: DMMF.Field, modelName: string) {
    super(field, modelName);

    this.zodValidatorString = this._getZodValidatorString();
    this.isTopLevelValidator = this._isTopLevelValidator();
  }

  // GET VALIDATOR STRING
  // ----------------------------------------------

  private _getZodValidatorString() {
    if (!this._validatorType || this._validatorType === 'custom')
      return this._defaultValidatorString;

    // get the zod validator string without array (is handled by the array validator)
    const zodValidatorString = this._validatorIsValid()
      ? this._getZodValidatorStringWithoutArray()
      : this.zodValidatorString;

    // if it is a ISO validator, transform it to the correct format
    if (zodValidatorString) {
      return this._transformIsoValidators(zodValidatorString);
    }

    // return the zod validator string
    return zodValidatorString;
  }

  private _isTopLevelValidator() {
    if (!this.zodValidatorString) return false;
    // only move to top level if the validator string comes directly after the validator string
    // e.g. @zod.string.email().min(3) and not @zod.string.min(3).max(5).email()
    const topLevelValidator = this.zodValidatorString.split('.')[1];

    if (
      STRING_FORMAT_VALIDATOR_REGEX_MAP_KEYS.some((key) =>
        topLevelValidator.startsWith(key),
      ) ||
      topLevelValidator === 'iso'
    ) {
      return true;
    }

    return false;
  }

  // HELPER
  // ----------------------------------------------

  private _getZodValidatorStringWithoutArray() {
    return this._getZodValidatorListWithoutArray()?.join('');
  }

  /**
   * Transforms the ISO validators to the correct format.
   * e.g. @zod.string.isoDate({ message: "Invalid ISO date" }) -> @zod.iso.date({ message: "Invalid ISO date" })
   * @param zodValidatorString The Zod validator string.
   * @returns The transformed ISO validators.
   */
  private _transformIsoValidators(zodValidatorString: string) {
    const matchedValidator = zodValidatorString.match(
      STRING_FORMAT_VALIDATOR_ISO_MESSAGE_REGEX,
    )?.groups?.['validator'];

    if (matchedValidator) {
      return zodValidatorString.replace(matchedValidator, (entry) => {
        return (
          ISO_VALIDATOR_MAP.find((map) => entry.includes(map[0]))?.[1] ||
          entry[1]
        );
      });
    }

    return zodValidatorString;
  }
}
