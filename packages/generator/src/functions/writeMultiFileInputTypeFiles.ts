import {
  writeCustomEnum,
  writeDecimalJsLike,
  writeInclude,
  writeInputJsonValue,
  writeInputObjectType,
  writeIsValidDecimalInput,
  writeJsonValue,
  writePrismaEnum,
  writeSelect,
} from '.';
import { FileWriter } from '../classes';
import { CreateFiles } from '../types';
import { writeRemoveUndefined } from './contentWriters/writeRemoveUndefined';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeInputTypeFiles: CreateFiles = ({ path, dmmf }) => {
  const { inputTypePath, writeBarrelFiles } = dmmf.generatorConfig;

  // WRITE INDEX FILE
  // ------------------------------------------------------------
  const indexFileWriter = new FileWriter(dmmf.generatorConfig);

  const folderPath = indexFileWriter.createPath(`${path}/${inputTypePath}`);

  if (folderPath) {
    if (writeBarrelFiles) {
      indexFileWriter.createFile(
        `${folderPath}/index.ts`,
        ({ writeExport }) => {
          const writeExportSet = new Set<string>();

          if (dmmf.generatorConfig.createInputTypes) {
            dmmf.schema.inputObjectTypes.prisma.forEach((inputType) => {
              writeExportSet.add(`${inputType.name}Schema`);
            });
          }

          dmmf.schema.enumTypes.prisma.forEach((enumData) => {
            writeExportSet.add(`${enumData.name}Schema`);
          });

          dmmf.datamodel.enums.forEach((enumData) => {
            writeExportSet.add(`${enumData.name}Schema`);
          });

          if (dmmf.generatorConfig.useExactOptionalPropertyTypes) {
            writeExportSet.add('RemoveUndefined');
          }

          if (dmmf.schema.hasJsonTypes) {
            writeExportSet.add(`InputJsonValueSchema`);
            writeExportSet.add(`JsonValueSchema`);
          }

          if (dmmf.schema.hasDecimalTypes) {
            writeExportSet.add(`DecimalJsLikeSchema`);
            writeExportSet.add(`isValidDecimalInput`);
          }

          writeExportSet.forEach((exportName) => {
            writeExport(`{ ${exportName} }`, `./${exportName}`);
          });
        },
      );
    }

    ////////////////////////////////////////////////////
    // WRITE HELPER FUNCTIONS & SCHEMAS
    ////////////////////////////////////////////////////

    // EXACT OPTIONAL PROPERTY TYPES
    // ------------------------------------------------------------

    if (dmmf.generatorConfig.useExactOptionalPropertyTypes) {
      new FileWriter().createFile(
        `${folderPath}/RemoveUndefined.ts`,
        (fileWriter) => writeRemoveUndefined({ fileWriter, dmmf }),
      );
    }

    // JSON
    // ------------------------------------------------------------

    if (dmmf.schema.hasJsonTypes) {
      new FileWriter(dmmf.generatorConfig).createFile(
        `${folderPath}/JsonValueSchema.ts`,
        (fileWriter) => writeJsonValue({ fileWriter, dmmf }),
      );

      new FileWriter(dmmf.generatorConfig).createFile(
        `${folderPath}/InputJsonValueSchema.ts`,
        (fileWriter) => writeInputJsonValue({ fileWriter, dmmf }),
      );
    }

    // DECIMAL
    // ------------------------------------------------------------

    if (dmmf.schema.hasDecimalTypes) {
      new FileWriter(dmmf.generatorConfig).createFile(
        `${folderPath}/DecimalJsLikeSchema.ts`,
        (fileWriter) => writeDecimalJsLike({ fileWriter, dmmf }),
      );

      new FileWriter(dmmf.generatorConfig).createFile(
        `${folderPath}/isValidDecimalInput.ts`,
        (fileWriter) => writeIsValidDecimalInput({ fileWriter, dmmf }),
      );
    }

    ////////////////////////////////////////////////////
    // WRITE ENUMS
    ////////////////////////////////////////////////////

    dmmf.schema.enumTypes.prisma.forEach((enumData) => {
      new FileWriter(dmmf.generatorConfig).createFile(
        `${folderPath}/${enumData.name}Schema.ts`,
        (fileWriter) => writePrismaEnum({ fileWriter, dmmf }, enumData),
      );
    });

    dmmf.datamodel.enums.forEach((enumData) => {
      new FileWriter(dmmf.generatorConfig).createFile(
        `${folderPath}/${enumData.name}Schema.ts`,
        (fileWriter) => writeCustomEnum({ fileWriter, dmmf }, enumData),
      );
    });

    ////////////////////////////////////////////////////
    // SKIP INPUT TYPES
    ////////////////////////////////////////////////////

    if (!dmmf.generatorConfig.createInputTypes) return;

    ////////////////////////////////////////////////////
    // WRITER INCLUDE & SELECT
    ////////////////////////////////////////////////////

    dmmf.schema.outputObjectTypes.model.forEach((model) => {
      if (model.hasRelationField()) {
        new FileWriter(dmmf.generatorConfig).createFile(
          `${folderPath}/${model.name}IncludeSchema.ts`,
          (fileWriter) => writeInclude({ fileWriter, dmmf }, model),
        );
      }

      new FileWriter(dmmf.generatorConfig).createFile(
        `${folderPath}/${model.name}SelectSchema.ts`,
        (fileWriter) => writeSelect({ fileWriter, dmmf }, model),
      );
    });

    ////////////////////////////////////////////////////
    // WRITE INPUT TYPE FILES
    ////////////////////////////////////////////////////

    dmmf.schema.inputObjectTypes.prisma.forEach((inputType) => {
      new FileWriter(dmmf.generatorConfig).createFile(
        `${folderPath}/${inputType.name}Schema.ts`,
        (fileWriter) => writeInputObjectType({ fileWriter, dmmf }, inputType),
      );
    });
  }
};
