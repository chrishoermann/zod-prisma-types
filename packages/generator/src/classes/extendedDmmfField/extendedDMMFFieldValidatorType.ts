import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFFieldValidatorMatch } from './extendedDMMFFieldValidatorMatch';
import { GeneratorConfig } from '../../schemas';
import { PrismaScalarType } from '../../types';

/////////////////////////////////////////////////
// TYPES
/////////////////////////////////////////////////

export type ZodValidatorType =
  | 'string'
  | 'number'
  | 'bigint'
  | 'date'
  | 'custom';

/////////////////////////////////////////////////
// VALIDATOR TYPE MAP
/////////////////////////////////////////////////

/**
 * Map all `validators` that can be used in the rich-comments in the prisma.schema field
 * to the prisma scalar types on which the `validator` is allowed.
 *
 * E.g. when `@zod.string.max(10)` is used on a prisma `String` type,
 * the map is used to determine if the zod validator is valid
 * for this specific scalar type.
 *
 * @example myPrismaField: String ///@zod.string.max(10) -> valid
 * @example myPrismaField: Boolean ///@zod.custom(..some custom implementation) -> valid
 * @example myPrismaField: Int ///@zod.string.max(10) -> invalid throws error during generation
 */
export const PRISMA_TO_VALIDATOR_TYPE_MAP: Record<
  ZodValidatorType,
  PrismaScalarType[]
> = {
  string: ['String'],
  number: ['Float', 'Int'],
  bigint: ['BigInt'],
  date: ['DateTime'],
  custom: [
    'String',
    'Boolean',
    'Int',
    'BigInt',
    'Float',
    'Decimal',
    'DateTime',
    'Json',
    'Bytes',
  ],
};

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFFieldValidatorType extends ExtendedDMMFFieldValidatorMatch {
  protected validatorType?: ZodValidatorType;

  constructor(
    field: DMMF.Field,
    generatorConfig: GeneratorConfig,
    modelName: string,
  ) {
    super(field, generatorConfig, modelName);

    this.validatorType = this._setValidatorType();
  }

  private _setValidatorType() {
    if (!this.validatorMatch?.groups?.['type']) return;
    return this._checkValidatorType(this.validatorMatch.groups['type']);
  }

  // Check if the validator type is valid for the field's type.
  // Enums need to be handled separately, since enums can have a
  // custom name they can't be mapped to a prisma scalar type
  // and therefore can't be checked against the validator type map.

  private _checkValidatorType(validatorType: string) {
    // typecast the validator type to a ZodValidatorType - throws error if it's not valid
    const zodValidatorType = this._getZodValidatorType(validatorType);

    // Check if "custom" validator is used on enum type
    if (this._isEnumValidatorType(zodValidatorType)) return zodValidatorType;

    // Check if validator type is valid for the field's type
    if (this._isPrismaValidatorType(zodValidatorType)) return zodValidatorType;

    throw new Error(
      `[@zod generator error]: Validator '${validatorType}' is not valid for type '${this.type}'. ${this.errorLocation}`,
    );
  }

  private _getZodValidatorType(validatorType: string) {
    if (this._isZodValidatorType(validatorType)) return validatorType;

    throw new Error(
      `[@zod generator error]: '${validatorType}' is not a valid validator type. ${this.errorLocation}`,
    );
  }

  private _isZodValidatorType(type?: string): type is ZodValidatorType {
    return /string|number|bigint|date|custom/.test(type as string);
  }

  private _isEnumValidatorType = (validatorType: ZodValidatorType) => {
    return validatorType === 'custom' && this.kind === 'enum';
  };

  private _isPrismaValidatorType(validatorType: ZodValidatorType) {
    return PRISMA_TO_VALIDATOR_TYPE_MAP[validatorType].includes(
      this.type as PrismaScalarType,
    );
  }
}
