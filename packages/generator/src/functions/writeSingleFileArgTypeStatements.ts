import { type WriteStatements } from '../types';
import { writeOutputObjectType } from './contentWriters';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeSingleFileArgTypeStatements: WriteStatements = (
  dmmf,
  fileWriter,
) => {
  if (!dmmf.generatorConfig.createInputTypes) return;

  fileWriter.writer.blankLine();

  fileWriter.writeHeading(`ARGS`, 'FAT');

  dmmf.schema.outputObjectTypes.argTypes.forEach((outputType) => {
    outputType.prismaActionFields.forEach((field) => {
      writeOutputObjectType({ dmmf, fileWriter }, field);
    });
  });
};
