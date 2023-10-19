import { DMMF } from '@prisma/generator-helper';
import { GeneratorConfig } from 'src/schemas';
import { getNestedValidatorList } from 'src/utils/getNestedValidatorList';
import { ExtendedDMMFModelValidatorMatch } from './03_extendedDMMFModelValidatorMatch';

/////////////////////////////////////////////////
// REGEX
/////////////////////////////////////////////////

export const IMPORT_STATEMENT_REGEX_PATTERN =
  /(@zod(?<validatorPattern>\..+?\))(?=\s|$))/;

// todo: check if import is in validator list and extract it to a separate property

export const ALLOWED_TYPES_REGEX_PATTERN =
  /\.(import|refine|transform|strict)\(/;

const extractValidatorKeyword = (str: string) => {
  const match = str.match(/\.(.*?)\(/);
  return match ? match[1] : null; // match[1] will give the captured word
};

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFModelValidatorPattern extends ExtendedDMMFModelValidatorMatch {
  protected _validatorPattern?: string;
  protected _validatorList?: string[];

  constructor(generatorConfig: GeneratorConfig, model: DMMF.Model) {
    super(generatorConfig, model);

    this._validatorPattern = this._getValidatorPattern();
    this._validatorList = this._getValidatorList();
  }

  private _getValidatorPattern() {
    if (!this._validatorMatch) return;
    return this._validatorMatch?.groups?.['validatorPattern'];
  }

  private _getValidatorList() {
    if (!this._validatorPattern) return;
    const validatorList = getNestedValidatorList(this._validatorPattern);

    validatorList.forEach((validatorString) => {
      const validatorKeyword = extractValidatorKeyword(validatorString);
      const isValid = ALLOWED_TYPES_REGEX_PATTERN.test(validatorString);

      if (!isValid) {
        throw new Error(
          `[@zod generator error]: '${validatorKeyword}' is not valid as validator. ${this._errorLocation}`,
        );
      }
    });

    return validatorList;
  }
}
