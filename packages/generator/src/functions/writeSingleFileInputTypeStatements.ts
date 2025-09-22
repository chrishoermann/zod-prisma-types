import { type WriteStatements } from '../types';
import { writeInputObjectType } from './contentWriters';
import { getConfig } from '../config';
import { getExtendedDMMF } from '../classes';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeSingleFileInputTypeStatements: WriteStatements = (
  fileWriter,
) => {
  if (!getConfig().createInputTypes) return;
  const dmmf = getExtendedDMMF();
  fileWriter.writer.blankLine();

  fileWriter.writeHeading(`INPUT TYPES`, 'FAT');

  dmmf.schema.inputObjectTypes.prisma.forEach((inputType) => {
    writeInputObjectType({ fileWriter }, inputType);
    fileWriter.writer.newLine();
  });
};
