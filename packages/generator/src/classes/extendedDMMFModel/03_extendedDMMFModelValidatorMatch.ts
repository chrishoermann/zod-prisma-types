import { DMMF } from '@prisma/generator-helper';
import { GeneratorConfig } from '../../schemas';
import { ExtendedDMMFModelFlags } from './02_extendedDMMFModelFlags';

/////////////////////////////////////////////////
// REGEX
/////////////////////////////////////////////////

export const IMPORT_STATEMENT_REGEX_PATTERN =
  /@zod(?<validatorPattern>[\w\p{Script=Cyrillic}\p{Script=Latin}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}\p{Punctuation}\p{M}\p{N} (),.'"。、|\\:+*#!§$%&/{}[\]=?~><°^\\-]*[)])/u;

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFModelValidatorMatch extends ExtendedDMMFModelFlags {
  protected _validatorMatch?: RegExpMatchArray;
  readonly clearedDocumentation?: string;

  constructor(generatorConfig: GeneratorConfig, model: DMMF.Model) {
    super(generatorConfig, model);

    this._validatorMatch = this._getValidatorMatchArray();

    this.clearedDocumentation = this._getClearedDocumentation();
  }

  private _getValidatorMatchArray() {
    if (!this.documentation) return;

    return (
      this.documentation.match(IMPORT_STATEMENT_REGEX_PATTERN) ?? undefined
    );
  }

  private _getClearedDocumentation() {
    if (!this.documentation) return;
    return (
      this.documentation
        .replace(IMPORT_STATEMENT_REGEX_PATTERN, '')
        .replace('  ', ' ')
        .trim() ?? undefined
    );
  }
}
