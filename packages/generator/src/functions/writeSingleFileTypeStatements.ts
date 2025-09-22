import { type WriteStatements } from '../types';
import { writeModelOrType } from './contentWriters';
import { getConfig } from '../config';
import { getExtendedDMMF } from '../classes';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeSingleFileTypeStatements: WriteStatements = (fileWriter) => {
  const dmmf = getExtendedDMMF();
  if (!getConfig().createModelTypes || dmmf.datamodel.types.length === 0)
    return;

  fileWriter.writer.blankLine();

  fileWriter.writeHeading(`COMPOSITE TYPES`, 'FAT');

  dmmf.datamodel.types.forEach((type) => {
    fileWriter.writeHeading(`${type.formattedNames.upperCaseSpace}`, 'SLIM');
    fileWriter.writer.newLine();
    writeModelOrType({ fileWriter }, type);
    fileWriter.writer.newLine();
  });
};
