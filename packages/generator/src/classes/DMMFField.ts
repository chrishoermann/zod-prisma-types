import { DMMF } from '@prisma/generator-helper';
import {
  DATE_VALIDATOR_REGEX_MAP,
  NUMBER_VALIDATOR_REGEX_MAP,
  STRING_VALIDATOR_REGEX,
  STRING_VALIDATOR_REGEX_MAP,
  VALIDATOR_TYPE_REGEX,
} from 'src/constants/regex';
import {
  PrismaScalarType,
  ValidatorFunctionMap,
  ValidatorFunctionOptions,
  ValidatorMap,
  ZodValidatorType,
  ZodValidatorTypeMap,
} from 'src/types';

import { FormattedNames } from './formattedNames';

/////////////////////////////////////////////////
// TYPES & INTERFACE
/////////////////////////////////////////////////

export interface Validator {
  match: string;
  validator: string;
  typeErrorMessages?: string;
}

/////////////////////////////////////////////////
// CONSTANTS
/////////////////////////////////////////////////

/**
 * Map zod validators to their corresponding prisma scalar types
 */
export const VALIDATOR_TYPE_MAP: ZodValidatorTypeMap = {
  string: ['String', 'DateTime'],
  number: ['Float', 'Int', 'Decimal'],
  date: ['DateTime'],
};

/////////////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////////////

export const validateRegexInMap = <TKeys extends string>(
  regexMap: ValidatorMap<TKeys, RegExp>,
  { validatorPattern, validatorKey: validator }: ValidatorFunctionOptions,
): string => {
  const regex = regexMap[validator as TKeys];

  if (!regex) {
    throw new Error(
      `Could not find regex for validator ${validator} in regexMap`,
    );
  }

  const match = validatorPattern.match(regex);

  if (!match) {
    throw new Error(
      `Could not match validator ${validator} with validatorPattern ${validatorPattern}`,
    );
  }

  return match[0];
};

export const VALIDATOR_MAP: ValidatorFunctionMap = {
  string: (options) => validateRegexInMap(STRING_VALIDATOR_REGEX_MAP, options),
  number: (options) => validateRegexInMap(NUMBER_VALIDATOR_REGEX_MAP, options),
  date: (options) => validateRegexInMap(DATE_VALIDATOR_REGEX_MAP, options),
};

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class DMMFField extends FormattedNames implements DMMF.Field {
  readonly kind: DMMF.Field['kind'];
  readonly name: DMMF.Field['name'];
  readonly isRequired: DMMF.Field['isRequired'];
  readonly isList: DMMF.Field['isList'];
  readonly isUnique: DMMF.Field['isUnique'];
  readonly isId: DMMF.Field['isId'];
  readonly isReadOnly: DMMF.Field['isReadOnly'];
  readonly type: DMMF.Field['type'];
  readonly dbNames?: DMMF.Field['dbNames'];
  readonly isGenerated: DMMF.Field['isGenerated'];
  readonly hasDefaultValue: DMMF.Field['hasDefaultValue'];
  readonly default?: DMMF.Field['default'];
  readonly relationToFields?: DMMF.Field['relationToFields'];
  readonly relationOnDelete?: DMMF.Field['relationOnDelete'];
  readonly relationName?: DMMF.Field['relationName'];
  readonly documentation?: DMMF.Field['documentation'];

  readonly validator?: Validator;
  private _validatorType: ZodValidatorType | undefined;
  private _validatorPatterns: string[] = [];

  constructor(field: DMMF.Field) {
    super(field.name);

    this.kind = field.kind;
    this.name = field.name;
    this.isRequired = field.isRequired;
    this.isList = field.isList;
    this.isUnique = field.isUnique;
    this.isId = field.isId;
    this.isReadOnly = field.isReadOnly;
    this.type = field.type;
    this.dbNames = field.dbNames;
    this.isGenerated = field.isGenerated;
    this.hasDefaultValue = field.hasDefaultValue;
    this.default = field.default;
    this.relationToFields = field.relationToFields;
    this.relationOnDelete = field.relationOnDelete;
    this.relationName = field.relationName;
    this.documentation = field.documentation;

    this.validator = this.setValidator();
  }

  private setValidatorType(validatorType: string) {
    const isValidType = VALIDATOR_TYPE_MAP[
      validatorType as ZodValidatorType
    ].includes(this.type as PrismaScalarType);

    if (!isValidType)
      throw new Error(
        `Validator '${validatorType}' is not valid for type '${this.type}'`,
      );

    this._validatorType = validatorType as ZodValidatorType;
  }

  private validateKeys(options: ValidatorFunctionOptions) {
    if (!this._validatorType) {
      throw new Error(`No validator type set in field: ${this.name}`);
    }

    return VALIDATOR_MAP[this._validatorType](options);
  }

  // To implement:
  // - check if only one validator is set
  // - check if validator is valid
  setValidator(): Validator | undefined {
    if (!this.documentation) return;

    const validator = this.documentation.match(VALIDATOR_TYPE_REGEX);

    if (!validator) return;

    const validatorType = validator.groups?.['type'];
    const validatorErrorMessages = validator.groups?.['errorMessages'];
    const validatorPattern = validator.groups?.['validatorPattern'];

    // TODO: support multiple validators by:
    // - splitting validatorPattern at "."
    // - validating each validator with validateKeys (shoud receive array of validators) and set the validatorPatterns in class

    const validatorKey = validator.groups?.['validatorKey']; // extract keys from validation pattern

    if (!validatorType) throw new Error('No validator type found');
    if (!validatorPattern) throw new Error('No validator pattern found');
    if (!validatorKey) throw new Error('No validator key found');

    this.setValidatorType(validatorType);
    const validatorString = this.validateKeys({
      validatorPattern,
      validatorKey,
    });

    // here the validator needs to be removed from teh documentation
    // and the documentation needs to be set to the new documentation

    return {
      match: validator[0],
      typeErrorMessages: validator[2],
      validator: validatorString,
    };
  }
}
