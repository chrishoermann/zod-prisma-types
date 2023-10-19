import { DMMF } from '@prisma/generator-helper';
import { GeneratorConfig } from 'src/schemas';
import { ExtendedDMMFModelFlags } from './02_extendedDMMFModelFlags';

export class ExtendedDMMFModelFormatingHelpers extends ExtendedDMMFModelFlags {
  readonly optionalJsonFieldUnion: string;

  constructor(generatorConfig: GeneratorConfig, model: DMMF.Model) {
    super(generatorConfig, model);

    this.optionalJsonFieldUnion = this._setOptionalJsonFieldUnion();
  }

  private _setOptionalJsonFieldUnion() {
    return this.optionalJsonFields
      .map((field) => `"${field.name}"`)
      .join(' | ');
  }
}
