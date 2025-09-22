import { type WriteStatements } from '../types';
import {
  writeArgs,
  writeCountArgs,
  writeCountSelect,
  writeInclude,
  writeSelect,
} from './contentWriters';
import { globalConfig } from '../config';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeSingleFileIncludeSelectStatements: WriteStatements = (
  dmmf,
  fileWriter,
) => {
  if (!globalConfig.getConfig().createInputTypes) return;
  fileWriter.writer.blankLine();

  fileWriter.writeHeading(`SELECT & INCLUDE`, 'FAT');

  fileWriter.writer.blankLine();

  dmmf.schema.outputObjectTypes.model.forEach((model) => {
    fileWriter.writeHeading(`${model.formattedNames.upperCaseSpace}`, 'SLIM');

    if (model.writeInclude()) {
      writeInclude({ fileWriter, dmmf }, model);
    }

    if (model.writeIncludeArgs()) {
      writeArgs({ fileWriter, dmmf }, model);
    }

    if (model.writeCountArgs()) {
      writeCountArgs({ fileWriter, dmmf }, model);
      writeCountSelect({ fileWriter, dmmf }, model);
    }

    writeSelect({ fileWriter, dmmf }, model);

    fileWriter.writer.blankLine();
  });
};
