import { FileWriter } from '../classes';
import { CreateFiles } from '../types';
import { writeModelOrType } from './contentWriters';
import { globalConfig } from '../config';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeModelFiles: CreateFiles = ({ path, dmmf }) => {
  const { createModelTypes, writeBarrelFiles } = globalConfig.getConfig();

  if (!createModelTypes) return;

  const indexFileWriter = new FileWriter();

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
