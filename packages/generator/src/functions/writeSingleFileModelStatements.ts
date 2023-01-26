import { type WriteStatements } from '../types';
import { writeModel } from './contentWriters';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeSingleFileModelStatements: WriteStatements = (
  dmmf,
  fileWriter,
) => {
  if (!dmmf.generatorConfig.createModelTypes) return;

  fileWriter.writeHeading(`MODELS`, 'FAT');

  dmmf.datamodel.models.forEach((model) => {
    fileWriter.writeHeading(`${model.formattedNames.upperCaseSpace}`, 'SLIM');
    fileWriter.writer.newLine();
    writeModel({ fileWriter, dmmf }, model);
    fileWriter.writer.newLine();
  });
};
