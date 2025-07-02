import { FileWriter } from '../classes';
import { CreateFiles } from '../types';
import { writeModelOrType } from './contentWriters';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeModelFiles: CreateFiles = ({ path, dmmf }) => {
  const { createModelTypes, writeBarrelFiles } = dmmf.generatorConfig;

  if (!createModelTypes) return;

  const indexFileWriter = new FileWriter(dmmf.generatorConfig);

  const folderPath = indexFileWriter.createPath(`${path}/modelSchema`);

  if (folderPath) {
    if (writeBarrelFiles) {
      indexFileWriter.createFile(
        `${folderPath}/index.ts`,
        ({ writeExport }) => {
          const writeExportSet = new Set<string>();

          dmmf.datamodel.models.forEach((model) => {
            writeExportSet.add(`${model.name}Schema`);
          });
          dmmf.datamodel.types.forEach((model) => {
            writeExportSet.add(`${model.name}Schema`);
          });

          writeExportSet.forEach((exportName) => {
            writeExport(`*`, `./${exportName}`);
          });

          // dmmf.datamodel.models.forEach((model) => {
          //   writeExport(`*`, `./${model.name}Schema`);
          // });
          // dmmf.datamodel.types.forEach((model) => {
          //   writeExport(`*`, `./${model.name}Schema`);
          // });
        },
      );
    }

    dmmf.datamodel.models.forEach((model) => {
      new FileWriter(dmmf.generatorConfig).createFile(
        `${folderPath}/${model.name}Schema.ts`,
        (fileWriter) => writeModelOrType({ fileWriter, dmmf }, model),
      );
    });

    dmmf.datamodel.types.forEach((model) => {
      new FileWriter(dmmf.generatorConfig).createFile(
        `${folderPath}/${model.name}Schema.ts`,
        (fileWriter) => writeModelOrType({ fileWriter, dmmf }, model),
      );
    });
  }
};
