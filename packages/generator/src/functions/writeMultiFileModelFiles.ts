import { FileWriter, getExtendedDMMF } from '../classes';
import { writeModelOrType } from './contentWriters';
import { getConfig } from '../config';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeModelFiles = () => {
  const config = getConfig();
  const dmmf = getExtendedDMMF();

  if (!config.createModelTypes) return;

  const indexFileWriter = new FileWriter();

  const folderPath = indexFileWriter.createPath(
    `${config.outputPath}/modelSchema`,
  );

  if (folderPath) {
    if (config.writeBarrelFiles) {
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
        (fileWriter) => writeModelOrType({ fileWriter }, model),
      );
    });

    dmmf.datamodel.types.forEach((model) => {
      new FileWriter().createFile(
        `${folderPath}/${model.name}Schema.ts`,
        (fileWriter) => writeModelOrType({ fileWriter }, model),
      );
    });
  }
};
