import { DMMF } from '@prisma/generator-helper';

import { GeneratorConfig } from '../schemas';
import { FormattedNames } from './formattedNames';

/////////////////////////////////////////////////
// CLASSES
/////////////////////////////////////////////////

export class ExtendedDMMFEnum extends FormattedNames {
  readonly name: string;
  readonly values: Readonly<DMMF.EnumValue[]>;
  readonly dbName?: string | null;
  readonly documentation?: string;

  constructor(
    readonly generatorConfig: GeneratorConfig,
    enums: DMMF.DatamodelEnum,
  ) {
    super(enums.name);
    this.generatorConfig = generatorConfig;
    this.name = enums.name;
    this.values = enums.values;
    this.dbName = enums.dbName;
    this.documentation = enums.documentation;
  }
}
