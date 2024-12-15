import { DMMF } from '@prisma/generator-helper';

import { GeneratorConfig } from '../schemas';

/////////////////////////////////////////////////
// CLASSES
/////////////////////////////////////////////////

export class ExtendedDMMFIndex implements DMMF.Index {
  readonly model: DMMF.Index['model'];
  readonly type: DMMF.Index['type'];
  readonly isDefinedOnField: DMMF.Index['isDefinedOnField'];
  readonly name?: DMMF.Index['name'];
  readonly dbName?: DMMF.Index['dbName'];
  readonly algorithm?: DMMF.Index['algorithm'];
  readonly clustered?: DMMF.Index['clustered'];
  readonly fields: DMMF.Index['fields'];

  constructor(
    readonly generatorConfig: GeneratorConfig,
    index: DMMF.Index,
  ) {
    this.model = index.model;
    this.type = index.type;
    this.isDefinedOnField = index.isDefinedOnField;
    this.name = index.name;
    this.dbName = index.dbName;
    this.algorithm = index.algorithm;
    this.clustered = index.clustered;
    this.fields = index.fields;
  }
}
