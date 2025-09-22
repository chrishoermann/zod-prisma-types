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
import { FileWriter, getExtendedDMMF } from '../classes';
import { writeRemoveUndefined } from './contentWriters/writeRemoveUndefined';
import { getConfig } from '../config';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeInputTypeFiles = () => {
  const config = getConfig();
  const dmmf = getExtendedDMMF();

  // WRITE INDEX FILE
  // ------------------------------------------------------------
  const indexFileWriter = new FileWriter();

  const folderPath = indexFileWriter.createPath(
    `${config.outputPath}/${config.inputTypePath}`,
  );

  if (folderPath) {
    if (config.writeBarrelFiles) {
      indexFileWriter.createFile(
        `${folderPath}/index.ts`,
        ({ writeExport }) => {
          const writeExportSet = new Set<string>();

          if (config.createInputTypes) {
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

          if (config.useExactOptionalPropertyTypes) {
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

    if (config.useExactOptionalPropertyTypes) {
      new FileWriter().createFile(
        `${folderPath}/RemoveUndefined.ts`,
        (fileWriter) => writeRemoveUndefined({ fileWriter }),
      );
    }

    // JSON
    // ------------------------------------------------------------

    if (dmmf.schema.hasJsonTypes) {
      new FileWriter().createFile(
        `${folderPath}/JsonValueSchema.ts`,
        (fileWriter) => writeJsonValue({ fileWriter }),
      );

      new FileWriter().createFile(
        `${folderPath}/InputJsonValueSchema.ts`,
        (fileWriter) => writeInputJsonValue({ fileWriter }),
      );
    }

    // DECIMAL
    // ------------------------------------------------------------

    if (dmmf.schema.hasDecimalTypes) {
      new FileWriter().createFile(
        `${folderPath}/DecimalJsLikeSchema.ts`,
        (fileWriter) => writeDecimalJsLike({ fileWriter }),
      );

      new FileWriter().createFile(
        `${folderPath}/isValidDecimalInput.ts`,
        (fileWriter) => writeIsValidDecimalInput({ fileWriter }),
      );
    }

    ////////////////////////////////////////////////////
    // WRITE ENUMS
    ////////////////////////////////////////////////////

    dmmf.schema.enumTypes.prisma.forEach((enumData) => {
      new FileWriter().createFile(
        `${folderPath}/${enumData.name}Schema.ts`,
        (fileWriter) => writePrismaEnum({ fileWriter }, enumData),
      );
    });

    dmmf.datamodel.enums.forEach((enumData) => {
      new FileWriter().createFile(
        `${folderPath}/${enumData.name}Schema.ts`,
        (fileWriter) => writeCustomEnum({ fileWriter }, enumData),
      );
    });

    ////////////////////////////////////////////////////
    // SKIP INPUT TYPES
    ////////////////////////////////////////////////////

    if (!config.createInputTypes) return;

    ////////////////////////////////////////////////////
    // WRITER INCLUDE & SELECT
    ////////////////////////////////////////////////////

    dmmf.schema.outputObjectTypes.model.forEach((model) => {
      if (model.hasRelationField()) {
        new FileWriter().createFile(
          `${folderPath}/${model.name}IncludeSchema.ts`,
          (fileWriter) => writeInclude({ fileWriter }, model),
        );
      }

      new FileWriter().createFile(
        `${folderPath}/${model.name}SelectSchema.ts`,
        (fileWriter) => writeSelect({ fileWriter }, model),
      );
    });

    ////////////////////////////////////////////////////
    // WRITE INPUT TYPE FILES
    ////////////////////////////////////////////////////

    dmmf.schema.inputObjectTypes.prisma.forEach((inputType) => {
      new FileWriter().createFile(
        `${folderPath}/${inputType.name}Schema.ts`,
        (fileWriter) => writeInputObjectType({ fileWriter }, inputType),
      );
    });
  }
};
