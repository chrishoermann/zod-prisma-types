import { type WriteStatements } from '../types';
import {
  writeArgs,
  writeCountArgs,
  writeCountSelect,
  writeInclude,
  writeSelect,
} from './contentWriters';
import { getConfig } from '../config';
import { getExtendedDMMF } from '../classes';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeSingleFileIncludeSelectStatements: WriteStatements = (
  fileWriter,
) => {
  if (!getConfig().createInputTypes) return;
  const dmmf = getExtendedDMMF();
  fileWriter.writer.blankLine();

  fileWriter.writeHeading(`SELECT & INCLUDE`, 'FAT');

  fileWriter.writer.blankLine();

  dmmf.schema.outputObjectTypes.model.forEach((model) => {
    fileWriter.writeHeading(`${model.formattedNames.upperCaseSpace}`, 'SLIM');

    if (model.writeInclude()) {
      writeInclude({ fileWriter }, model);
    }

    if (model.writeIncludeArgs()) {
      writeArgs({ fileWriter }, model);
    }

    if (model.writeCountArgs()) {
      writeCountArgs({ fileWriter }, model);
      writeCountSelect({ fileWriter }, model);
    }

    writeSelect({ fileWriter }, model);

    fileWriter.writer.blankLine();
  });
};
