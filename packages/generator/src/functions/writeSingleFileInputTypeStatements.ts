import { type WriteStatements } from '../types';
import { writeInputObjectType } from './contentWriters';
import { globalConfig } from '../config';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeSingleFileInputTypeStatements: WriteStatements = (
  dmmf,
  fileWriter,
) => {
  if (!globalConfig.getConfig().createInputTypes) return;

  fileWriter.writer.blankLine();

  fileWriter.writeHeading(`INPUT TYPES`, 'FAT');

  dmmf.schema.inputObjectTypes.prisma.forEach((inputType) => {
    writeInputObjectType({ dmmf, fileWriter }, inputType);
    fileWriter.writer.newLine();
  });
};
