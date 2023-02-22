import { ExtendedDMMFFieldZodType } from './extendedDMMFFieldZodType';

/**
 * This class is used to extend the DMMF Field class with additional properties
 * and methods.
 *
 * The class is structured in multiple sub-classes to keep the code clean,
 * readable and maintainable.
 *
 * The sub-classes are used in the following order and each one extends the previous one:
 * - ExtendedDMMFFieldBase
 * - ExtendedDMMFFieldValidatorMatch
 * - ExtendedDMMFFieldValidatorType
 * - ExtendedDMMFFieldValidatorPattern
 * - ExtendedDMMFFieldDefaultValidators
 * - ExtendedDMMFFieldValidatorCustomErrors
 * - ExtendedDMMFFieldValidatorMap
 * - ExtendedDMMFFieldValidatorString
 * - ExtendedDMMFFieldCustomValidatorString
 * - ExtendedDMMFFieldArrayValidatorString
 * - ExtendedDMMFFieldOmitField
 * - ExtendedDMMFFieldZodType
 */

export class ExtendedDMMFField extends ExtendedDMMFFieldZodType {}
