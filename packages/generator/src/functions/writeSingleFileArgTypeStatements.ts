import { type WriteStatements } from '../types';
import { writeOutputObjectType } from './contentWriters';
import { getConfig } from '../config';
import { getExtendedDMMF } from '../classes';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeSingleFileArgTypeStatements: WriteStatements = (
  fileWriter,
) => {
  if (!getConfig().createInputTypes) return;
  const dmmf = getExtendedDMMF();
  fileWriter.writer.blankLine();

  fileWriter.writeHeading(`ARGS`, 'FAT');

  dmmf.schema.outputObjectTypes.argTypes.forEach((outputType) => {
    outputType.prismaActionFields.forEach((field) => {
      writeOutputObjectType({ fileWriter }, field);
    });
  });
};
