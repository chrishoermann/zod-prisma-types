import { FileWriter } from '../classes';
import { CreateFiles } from '../types';
import {
  writeArgs,
  writeCountArgs,
  writeCountSelect,
  writeOutputObjectType,
} from './contentWriters';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeArgTypeFiles: CreateFiles = ({ path, dmmf }) => {
  if (!dmmf.generatorConfig.createInputTypes) return;

  const { outputTypePath, writeBarrelFiles } = dmmf.generatorConfig;

  // WRITE INDEX FILE
  // ------------------------------------------------------------

  const indexFileWriter = new FileWriter();

  const folderPath = indexFileWriter.createPath(`${path}/${outputTypePath}`);

  if (folderPath) {
    if (writeBarrelFiles) {
      indexFileWriter.createFile(
        `${folderPath}/index.ts`,
        ({ writeExport }) => {
          dmmf.schema.outputObjectTypes.model.forEach((model) => {
            if (model.hasRelationField()) {
              writeExport(
                `{ ${model.name}ArgsSchema }`,
                `./${model.name}ArgsSchema`,
              );
            }
          });
          dmmf.schema.outputObjectTypes.argTypes.forEach((outputType) => {
            outputType.prismaActionFields.forEach((field) => {
              writeExport(
                `{ ${field.argName}Schema }`,
                `./${field.argName}Schema`,
              );
            });
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
