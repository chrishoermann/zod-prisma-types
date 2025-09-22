import { type WriteStatements } from '../types';
import { writeModelOrType } from './contentWriters';
import { getConfig } from '../config';
import { getExtendedDMMF } from '../classes';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeSingleFileModelStatements: WriteStatements = (fileWriter) => {
  if (!getConfig().createModelTypes) return;

  const dmmf = getExtendedDMMF();
  fileWriter.writeHeading(`MODELS`, 'FAT');

  dmmf.datamodel.models.forEach((model) => {
    // fileWriter.writeHeading(`${model.formattedNames.upperCaseSpace}`, 'FAT');
    // fileWriter.writer.newLine();
    writeModelOrType({ fileWriter }, model);
    fileWriter.writer.newLine();
  });
};
