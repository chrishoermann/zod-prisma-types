import { FileWriter } from '../classes';
import { CreateFiles } from '../types';
import { writeModelOrType } from './contentWriters';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeModelFiles: CreateFiles = ({ path, dmmf }) => {
  const { createModelTypes, writeBarrelFiles } = dmmf.generatorConfig;

  if (!createModelTypes) return;

  const indexFileWriter = new FileWriter();

  const folderPath = indexFileWriter.createPath(`${path}/modelSchema`);

  if (folderPath) {
    if (writeBarrelFiles) {
      indexFileWriter.createFile(
        `${folderPath}/index.ts`,
        ({ writeExport }) => {
          dmmf.datamodel.models.forEach((model) => {
            writeExport(`*`, `./${model.name}Schema`);
          });
          dmmf.datamodel.types.forEach((model) => {
            writeExport(`*`, `./${model.name}Schema`);
          });
        },
      );
    }

    dmmf.datamodel.models.forEach((model) => {
      new FileWriter().createFile(
        `${folderPath}/${model.name}Schema.ts`,
        (fileWriter) => writeModelOrType({ fileWriter, dmmf }, model),
      );
    });

    dmmf.datamodel.types.forEach((model) => {
      new FileWriter().createFile(
        `${folderPath}/${model.name}Schema.ts`,
        (fileWriter) => writeModelOrType({ fileWriter, dmmf }, model),
      );
    });
  }
};
