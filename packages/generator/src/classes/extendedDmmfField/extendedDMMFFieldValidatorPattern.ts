import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFFieldValidatorType } from './extendedDMMFFieldValidatorType';
import { GeneratorConfig } from '../../schemas';

/////////////////////////////////////////////////
// REGEX
/////////////////////////////////////////////////

// const VALIDATOR_SPLIT_REGEX = /.[\w]+\((?!")/;
// const VALIDATOR_SPLIT_REGEX =
//   /(?<!\()\.(use|array)\((?:[^()]|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))*\)/g;
const VALIDATOR_SPLIT_REGEX = /(?=\.[\w]+)/;

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFFieldValidatorPattern extends ExtendedDMMFFieldValidatorType {
  protected validatorPattern?: string;
  protected validatorList?: string[];

  constructor(
    field: DMMF.Field,
    generatorConfig: GeneratorConfig,
    modelName: string,
  ) {
    super(field, generatorConfig, modelName);

    this.validatorPattern = this._getValidatorPattern();
    this.validatorList = this._getValidatorList();
  }

  private _getValidatorPattern() {
    if (!this.validatorMatch) return;
    return this.validatorMatch?.groups?.['validatorPattern'];
  }

  // If pattern consists of multiple validators (e.g. .min(1).max(10))
  // the pattern is split into an array for further processing.
  private _getValidatorList() {
    if (!this.validatorPattern) return;

    const splitIndices = [0];
    let depth = 0;

    [...this.validatorPattern].forEach((char, idx) => {
      if (!depth && !char.match(/\w/)) {
        const position = this.validatorPattern
          ?.substring(0, idx - 1)
          .match(/\.\w+$/)?.index;
        if (position) {
          splitIndices.push(position);
        }
      }

      if (char === '(') {
        depth++;
      }

      if (char === ')') {
        depth--;
      }
    });

    const pattern = splitIndices
      .map((e, i, a) => this.validatorPattern?.substring(e, a[i + 1]))
      .filter((str): str is string => !!str);

    return pattern;
  }
}
