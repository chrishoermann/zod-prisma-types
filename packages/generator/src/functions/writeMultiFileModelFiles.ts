import { FileWriter } from '../classes';
import { CreateFiles } from '../types';
import { writeModel } from './contentWriters';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeModelFiles: CreateFiles = ({ path, dmmf }) => {
  if (!dmmf.generatorConfig.createModelTypes) return;

  const indexFileWriter = new FileWriter();

  const modelPath = indexFileWriter.createPath(`${path}/modelSchema`);

  if (modelPath) {
    indexFileWriter.createFile(`${modelPath}/index.ts`, ({ writeExport }) => {
      dmmf.datamodel.models.forEach((model) => {
        writeExport(`*`, `./${model.name}Schema`);
      });
    });
  }

  dmmf.datamodel.models.forEach((model) => {
    new FileWriter().createFile(
      `${modelPath}/${model.name}Schema.ts`,
      (fileWriter) => writeModel({ fileWriter, dmmf }, model),
    );
  });
};
