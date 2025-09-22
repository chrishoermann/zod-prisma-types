import type DMMF from '@prisma/dmmf';
import { FormattedNames } from '../formattedNames';
import { ExtendedDMMFModelFormatingHelpers } from './08_extendedDMMFModelFormatingHelpers';
import { ExtendedDMMFField } from '../extendedDMMFField';

/////////////////////////////////////////////////
// TYPES  INTERFACE
/////////////////////////////////////////////////

export interface ExtendedDMMFModel extends DMMF.Model, FormattedNames {
  /**
   * Fields of the model that are extended with additional properties and methods.
   */
  readonly fields: ExtendedDMMFField[];

  /**
   * Fields of the model that are scalar fields.
   */
  readonly scalarFields: ExtendedDMMFField[];

  /**
   * Fields of the model that are relation fields.
   */
  readonly relationFields: ExtendedDMMFField[];

  /**
   * Fields of the model that are relation fields and not self referencing.
   */
  readonly filteredRelationFields: ExtendedDMMFField[];

  /**
   * Fields of the model that are enum fields.
   */
  readonly enumFields: ExtendedDMMFField[];

  /**
   * Fields of the model that are json fields and not required.
   */
  readonly optionalJsonFields: ExtendedDMMFField[];

  /**
   * Flag to indicate if the model has relation fields.
   */
  readonly hasRelationFields: boolean;

  /**
   * Flag to indicate if the model has required json fields.
   */
  readonly hasRequiredJsonFields: boolean;

  /**
   * Flag to indicate if the model has optional json fields.
   */
  readonly hasOptionalJsonFields: boolean;

  /**
   * Flag to indicate if the model has decimal fields.
   */
  readonly hasOmitFields: boolean;

  /**
   * Flag to indicate if the model has decimal fields.
   */
  readonly hasDecimalFields: boolean;

  /**
   * Flag to indicate if the model has optional default fields.
   */
  readonly hasOptionalDefaultFields: boolean;

  /**
   * Flag to indicate if additional types should be generated for optional default values.
   */
  readonly writeOptionalDefaultValuesTypes: boolean;

  /**
   * Flag to indicate if additional types should be generated for relation values.
   */
  readonly writeRelationValueTypes: boolean;

  /**
   * Flag to indicate if additional types should be generated for optional default values and relation values.
   */
  readonly writeOptionalDefaultsRelationValueTypes: boolean;

  /**
   * Flag to indicate if partial types should be generated.
   */
  readonly writePartialTypes: boolean;

  /**
   * Flag to indicate if partial types should be generated for relation values.
   */
  readonly writePartialRelationValueTypes: boolean;

  /**
   * Custom error messages that should be used on the generated schema
   */
  readonly zodCustomErrors?: string;

  /**
   * Custom validators that should be used on the generated schema
   */
  readonly zodCustomValidators?: string[];

  /**
   * Set of import statements that are used in the model and need to be added to the generated file.
   * Contains model, field and automatic imports like `import { InputJsonValue } from "../inputTypes/InputJsonValue";` for json fields.
   */
  readonly imports: Set<string>;

  /**
   * Set of import statements that are used in the model and need to be added to the generated file.
   * Contains only the model imports from the model's documentation.
   */
  readonly modelImports: Set<string>;

  /**
   * Set of import statements that are used in the model and need to be added to the generated file.
   * Contains only the field level imports from the model's documentation.
   */
  readonly fieldImports: Set<string>;

  /**
   * Documentation string provided via rich comments without the `@zod` directives.
   */
  readonly clearedDocumentation?: string;

  /**
   * Union of the names of the model's optional json fields.
   */
  readonly optionalJsonFieldUnion: string;
}

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

/**
 * This class is used to extend the DMMF Model class with additional properties
 * and methods.
 *
 * The class is structured in multiple sub-classes to keep the code clean,
 * readable and maintainable.
 *
 * The sub-classes are used in the following order and each one extends the previous one:
 * - ExtendedDMMFModelBase
 * - ExtendedDMMFModelFlags
 * - ExtendedDMMFModelValidatorMatch
 * - ExtendedDMMFModelValidatorPattern
 * - ExtendedDMMFModelImportStatement
 * - ExtendedDMMFModelCustomErrors
 * - ExtendedDMMFModelCustomValidators
 * - ExtendedDMMFFieldFormatingHelpers
 */

export class ExtendedDMMFModelClass extends ExtendedDMMFModelFormatingHelpers {}
