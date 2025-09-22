import { FileWriter } from '../classes';
import { CreateFiles } from '../types';
import {
  writeArgs,
  writeCountArgs,
  writeCountSelect,
  writeOutputObjectType,
} from './contentWriters';
import { globalConfig } from '../config';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeArgTypeFiles: CreateFiles = ({ path, dmmf }) => {
  const config = globalConfig.getConfig();

  if (!config.createInputTypes) return;

  const { outputTypePath, writeBarrelFiles } = config;

  // WRITE INDEX FILE
  // ------------------------------------------------------------

  const indexFileWriter = new FileWriter();

  const folderPath = indexFileWriter.createPath(`${path}/${outputTypePath}`);

  if (folderPath) {
    if (writeBarrelFiles) {
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
          (fileWriter) => writeArgs({ fileWriter, dmmf }, model),
        );
      }

      if (model.writeCountArgs()) {
        new FileWriter().createFile(
          `${folderPath}/${model.name}CountOutputTypeArgsSchema.ts`,
          (fileWriter) => writeCountArgs({ fileWriter, dmmf }, model),
        );

        new FileWriter().createFile(
          `${folderPath}/${model.name}CountOutputTypeSelectSchema.ts`,
          (fileWriter) => writeCountSelect({ fileWriter, dmmf }, model),
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
          (fileWriter) => writeOutputObjectType({ fileWriter, dmmf }, field),
        );
      });
    });
  }
};
