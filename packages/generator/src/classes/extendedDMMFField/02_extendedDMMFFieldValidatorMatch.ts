import type DMMF from '@prisma/dmmf';

import { ExtendedDMMFFieldBase } from './01_extendedDMMFFieldBase';
import { GeneratorConfig } from '../../schemas';

/////////////////////////////////////////////////
// REGEX
/////////////////////////////////////////////////

// Match the literal string "@zod."
// Named capture group "import" (optional): Match the literal string ".import([" followed by one or more characters from the character class, then the literal string "])"
// Named capture group "type": Match one or more word characters (letters, digits, or underscores) exactly once
// Named capture group "customErrors" (optional): Match an opening parenthesis "(", followed by one or more characters from the character class, then a closing parenthesis ")"
// The character class in "customErrors" includes word characters, Japanese Hiragana, Katakana, and Kanji characters, and various punctuation marks and symbols
// Named capture group "validatorPattern" (optional): Match one or more characters from the character class
// The character class in "validatorPattern" includes word characters, Japanese Hiragana, Katakana, and Kanji characters, and various punctuation marks and symbols
// "u" flag for Unicode support

export const VALIDATOR_TYPE_REGEX =
  /@zod(?<import>\.import\(\[(?<imports>[\w\s"@'${}/,;:.~*-]+)\]\))?\.(?<type>[\w]+){1}(?<customErrors>\([{][\s\S]*?[}]\))?(?<validatorPattern>[\s\S]*)?/u;

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFFieldValidatorMatch extends ExtendedDMMFFieldBase {
  protected _validatorMatch?: RegExpMatchArray;
  readonly clearedDocumentation?: string;

  constructor(
    field: DMMF.Field,
    generatorConfig: GeneratorConfig,
    modelName: string,
  ) {
    super(field, generatorConfig, modelName);

    this._validatorMatch = this._getValidatorMatchArray();
    this.clearedDocumentation = this._getClearedDocumentation();
  }

  private _getValidatorMatchArray() {
    if (!this.documentation) return;
    return this.documentation.match(VALIDATOR_TYPE_REGEX) ?? undefined;
  }

  private _getClearedDocumentation() {
    if (!this.documentation) return;
    return (
      this.documentation.replace(VALIDATOR_TYPE_REGEX, '').trim() || undefined
    );
  }
}
