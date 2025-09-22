import { type WriteStatements } from '../types';
import { writeModelOrType } from './contentWriters';
import { globalConfig } from '../config';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeSingleFileTypeStatements: WriteStatements = (
  dmmf,
  fileWriter,
) => {
  if (
    !globalConfig.getConfig().createModelTypes ||
    dmmf.datamodel.types.length === 0
  )
    return;

  fileWriter.writer.blankLine();

  fileWriter.writeHeading(`COMPOSITE TYPES`, 'FAT');

  dmmf.datamodel.types.forEach((type) => {
    fileWriter.writeHeading(`${type.formattedNames.upperCaseSpace}`, 'SLIM');
    fileWriter.writer.newLine();
    writeModelOrType({ fileWriter, dmmf }, type);
    fileWriter.writer.newLine();
  });
};
