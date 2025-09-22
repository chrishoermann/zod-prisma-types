import { type WriteStatements } from '../types';
import { writeModelOrType } from './contentWriters';
import { globalConfig } from '../config';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeSingleFileModelStatements: WriteStatements = (
  dmmf,
  fileWriter,
) => {
  if (!globalConfig.getConfig().createModelTypes) return;

  fileWriter.writeHeading(`MODELS`, 'FAT');

  dmmf.datamodel.models.forEach((model) => {
    // fileWriter.writeHeading(`${model.formattedNames.upperCaseSpace}`, 'FAT');
    // fileWriter.writer.newLine();
    writeModelOrType({ fileWriter, dmmf }, model);
    fileWriter.writer.newLine();
  });
};
