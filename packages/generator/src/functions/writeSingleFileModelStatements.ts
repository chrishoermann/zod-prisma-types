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

  const { writer, writeHeading } = fileWriter;

  writeHeading(`MODELS`, 'FAT');

  dmmf.datamodel.models.forEach((model) => {
    // write standard model that represents the model type from prismas "index.d.ts"

    writeHeading(`${model.formattedNames.upperCaseSpace}`, 'SLIM');

    writer.blankLine();

    writeModel({ fileWriter, dmmf }, model);
  });
};
