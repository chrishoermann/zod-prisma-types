import {
  writeArgs,
  writeCountArgs,
  writeCountSelect,
  writeInclude,
  writeSelect,
} from './contentWriters';
import { type WriteStatements } from '../types';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeSingleFileIncludeSelectStatements: WriteStatements = (
  dmmf,
  fileWriter,
) => {
  if (!dmmf.generatorConfig.createInputTypes) return;
  fileWriter.writeHeading(`SELECT & INCLUDE`, 'FAT');

  fileWriter.writer.blankLine();

  dmmf.schema.outputObjectTypes.model.forEach((model) => {
    fileWriter.writeHeading(`${model.formattedNames.upperCaseSpace}`, 'SLIM');

    if (model.hasRelationField() || model.writeMongoDbInclude()) {
      writeInclude({ fileWriter, dmmf }, model);
    }

    if (model.hasRelationField() || model.isMongoDb()) {
      writeArgs({ fileWriter, dmmf }, model);
    }

    if (model.hasCountField()) {
      writeCountArgs({ fileWriter, dmmf }, model);
      writeCountSelect({ fileWriter, dmmf }, model);
    }

    writeSelect({ fileWriter, dmmf }, model);

    fileWriter.writer.newLine();
  });
};
