import { writeCustomEnum, writePrismaEnum } from '.';
import { type WriteStatements } from '../types';
import { getExtendedDMMF } from '../classes';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeSingleFileEnumStatements: WriteStatements = (fileWriter) => {
  const dmmf = getExtendedDMMF();
  fileWriter.writer.blankLine();

  fileWriter.writeHeading(`ENUMS`, 'FAT');

  dmmf.schema.enumTypes.prisma.forEach((enumData) => {
    writePrismaEnum({ fileWriter }, enumData);
  });

  dmmf.datamodel.enums.forEach((enumData) => {
    writeCustomEnum({ fileWriter }, enumData);
  });

  fileWriter.writer.newLine();
};
