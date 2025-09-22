import { FileWriter, getExtendedDMMF } from '../classes';
import {
  writeArgs,
  writeCountArgs,
  writeCountSelect,
  writeOutputObjectType,
} from './contentWriters';
import { getConfig } from '../config';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeArgTypeFiles = () => {
  const config = getConfig();
  const dmmf = getExtendedDMMF();

  if (!config.createInputTypes) return;

  // WRITE INDEX FILE
  // ------------------------------------------------------------

  const indexFileWriter = new FileWriter();

  const folderPath = indexFileWriter.createPath(
    `${config.outputPath}/${config.outputTypePath}`,
  );

  if (folderPath) {
    if (config.writeBarrelFiles) {
      indexFileWriter.createFile(
        `${folderPath}/index.ts`,
        ({ writeExport }) => {
          const writeExportSet = new Set<string>();

          dmmf.schema.outputObjectTypes.model.forEach((model) => {
            if (model.hasRelationField()) {
              writeExportSet.add(`${model.name}ArgsSchema`);
            }
          });

          dmmf.schema.outputObjectTypes.argTypes.forEach((outputType) => {
            outputType.prismaActionFields.forEach((field) => {
              writeExportSet.add(`${field.argName}Schema`);
            });
          });

          writeExportSet.forEach((exportName) => {
            writeExport(`{ ${exportName} }`, `./${exportName}`);
          });
        },
      );
    }

    ////////////////////////////////////////////////////
    // INCLUDE SELECT ARGS
    ////////////////////////////////////////////////////

    dmmf.schema.outputObjectTypes.model.forEach((model) => {
      if (model.writeIncludeArgs()) {
        new FileWriter().createFile(
          `${folderPath}/${model.name}ArgsSchema.ts`,
          (fileWriter) => writeArgs({ fileWriter }, model),
        );
      }

      if (model.writeCountArgs()) {
        new FileWriter().createFile(
          `${folderPath}/${model.name}CountOutputTypeArgsSchema.ts`,
          (fileWriter) => writeCountArgs({ fileWriter }, model),
        );

        new FileWriter().createFile(
          `${folderPath}/${model.name}CountOutputTypeSelectSchema.ts`,
          (fileWriter) => writeCountSelect({ fileWriter }, model),
        );
      }
    });

    ////////////////////////////////////////////////////
    // ARG SCHEMAS
    ////////////////////////////////////////////////////

    dmmf.schema.outputObjectTypes.argTypes.forEach((outputType) => {
      outputType.prismaActionFields.forEach((field) => {
        new FileWriter().createFile(
          `${folderPath}/${field.argName}Schema.ts`,
          (fileWriter) => writeOutputObjectType({ fileWriter }, field),
        );
      });
    });
  }
};
